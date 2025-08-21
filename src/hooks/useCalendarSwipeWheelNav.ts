import { RefObject, useEffect, useMemo, useRef } from 'react';
import throttle from 'lodash.throttle';

/** React-big-calendar 전용 인접달 이동 훅
 * @targetRef useRef로 캘린더 부모 div 연결
 * @onPrev 이전 달로 이동하는 함수
 * @onNext 다음 달로 이동하는 함수
 * @wheelAxis 트랙패드용 이동감지 설정 기본 auto로 대각선인식시 더 큰 축으로 판단
 * @wheelMinDelta 휠/트랙패드 민감도
 * @wheelThrottleMs 호출 주기 기본 300ms
 * @swipeThresholdPx 모바일 스와이프 임계값 기본 48
 * @ignoreVertical 세로로 움직인 거리가 가로보다 크면, 스와이프로 처리하지 않고 무시
 * @swipeCooldownMs 스와이프 후 쿨다운 기본 250
 * @wheelAggregate 트랙패드 델타를 누적해 임계값을 넘을 때만 이동(기본 true)
 * @wheelAggregateThreshold 누적 임계값(px) 기본 140
 * @wheelCooldownMs 휠 트리거 후 짧은 쿨다운(ms) 기본 260
 */
type HooksType = {
  targetRef: RefObject<HTMLElement | null>;
  onPrev: () => void;
  onNext: () => void;
  // 휠(마우스/트랙패드)
  wheelAxis?: 'x' | 'y' | 'auto'; // 기본 auto: 더 큰 축 채택
  wheelMinDelta?: number; // 데드존(노이즈 컷)
  wheelThrottleMs?: number; // 누적 모드 OFF일 때 사용
  // 트랙패드 튜닝(누적 모드)
  wheelAggregate?: boolean; //누적 모드 ON/OFF
  wheelAggregateThreshold?: number; //누적 임계값(px)
  wheelCooldownMs?: number; //트리거 후 쿨다운(ms)
  // 스와이프(모바일 터치)
  swipeThresholdPx?: number;
  ignoreVertical?: boolean; // 세로 이동이 더 크면 무시
  swipeCooldownMs?: number; // 스와이프 후 쿨다운
};

export function useCalendarSwipeWheelNav({
  targetRef,
  onPrev,
  onNext,
  // 휠/트랙패드
  wheelAxis = 'auto',
  wheelMinDelta = 4,
  wheelThrottleMs = 400,
  // 트랙패드 누적 모드
  wheelAggregate = true,
  wheelAggregateThreshold = 300,
  wheelCooldownMs = 260,
  // 터치 스와이프
  swipeThresholdPx = 48,
  ignoreVertical = true,
  swipeCooldownMs = 250,
}: HooksType) {
  // 최신 콜백 유지=> 리랜더링을 위한 Ref?
  const prevRef = useRef(onPrev);
  const nextRef = useRef(onNext);
  useEffect(() => {
    prevRef.current = onPrev;
  }, [onPrev]);
  useEffect(() => {
    nextRef.current = onNext;
  }, [onNext]);

  const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());

  // 터치 스와이프 상태
  const startX = useRef(0);
  const startY = useRef(0);
  const swipeLockedUntil = useRef(0);

  // 휠 누적 상태(트랙패드 튜닝)
  const wheelAccum = useRef(0);
  const wheelLastDir = useRef<1 | -1 | 0>(0);
  const lastWheelTriggerAt = useRef(0);

  const shouldIgnoreTarget = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return false;
    if (target.closest('[data-ignore-swipe]')) return true;
    const tag = target.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || target.isContentEditable) return true;
    return false;
  };

  // 누적 모드 OFF일 때 사용할 throttle 경로
  const navigateThrottled = useMemo(
    () =>
      throttle(
        (dir: 'prev' | 'next') => {
          if (dir === 'prev') prevRef.current?.();
          else nextRef.current?.();
        },
        wheelThrottleMs,
        { leading: true, trailing: false },
      ),
    [wheelThrottleMs],
  );

  useEffect(() => {
    const root = targetRef.current;
    if (!root) return;

    // RBC 내부 월 그리드에 직접 바인딩(누락 방지)
    const el = (root.querySelector('.rbc-month-view') as HTMLElement) ?? root;

    // deltaMode 정규화: line(1) → 약 16px 환산
    const norm = (d: number, mode: number) => (mode === 1 ? d * 16 : d);

    // --- Wheel / Trackpad ---
    const onWheel = (e: WheelEvent) => {
      if (shouldIgnoreTarget(e.target)) return;

      const dx = norm(e.deltaX, e.deltaMode);
      const dy = norm(e.deltaY, e.deltaMode);

      const axis: 'x' | 'y' = wheelAxis === 'auto' ? (Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y') : wheelAxis;

      const delta = axis === 'x' ? dx : dy;
      if (Math.abs(delta) < wheelMinDelta) return;

      if (wheelAggregate) {
        // 트리거 직후 쿨다운
        if (now() - lastWheelTriggerAt.current < wheelCooldownMs) return;

        const dir: 1 | -1 = delta > 0 ? 1 : -1;

        // 방향 전환 시 누적 리셋(히스테리시스)
        if (wheelLastDir.current !== 0 && wheelLastDir.current !== dir) {
          wheelAccum.current = 0;
        }
        wheelLastDir.current = dir;

        wheelAccum.current += delta;

        if (Math.abs(wheelAccum.current) >= wheelAggregateThreshold) {
          if (wheelAccum.current > 0) nextRef.current?.();
          else prevRef.current?.();

          wheelAccum.current = 0;
          lastWheelTriggerAt.current = now();
        }
        return;
      }

      // 누적 모드 OFF: 스로틀 경로
      navigateThrottled(delta > 0 ? 'next' : 'prev');
    };

    // --- Touch (Swipe) ---
    const onTouchStart = (e: TouchEvent) => {
      if (shouldIgnoreTarget(e.target)) return;
      if (e.touches.length !== 1) return;
      startX.current = e.touches[0].clientX;
      startY.current = e.touches[0].clientY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (shouldIgnoreTarget(e.target)) return;
      const touch = e.changedTouches[0];
      if (!touch) return;

      // 쿨다운 중이면 무시
      if (now() < swipeLockedUntil.current) return;

      const dx = touch.clientX - startX.current;
      const dy = touch.clientY - startY.current;

      if (ignoreVertical && Math.abs(dx) <= Math.abs(dy)) return;
      if (Math.abs(dx) < swipeThresholdPx) return;

      if (dx > 0) prevRef.current?.();
      else nextRef.current?.();

      swipeLockedUntil.current = now() + swipeCooldownMs;
    };

    el.addEventListener('wheel', onWheel, { passive: true });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('wheel', onWheel as EventListener);
      el.removeEventListener('touchstart', onTouchStart as EventListener);
      el.removeEventListener('touchend', onTouchEnd as EventListener);
      navigateThrottled.cancel();
    };
  }, [
    targetRef,
    wheelAxis,
    wheelMinDelta,
    wheelAggregate,
    wheelAggregateThreshold,
    wheelCooldownMs,
    ignoreVertical,
    swipeThresholdPx,
    swipeCooldownMs,
    navigateThrottled,
  ]);
}
