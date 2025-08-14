import { RefObject, useEffect, useMemo, useRef } from 'react';
import throttle from 'lodash.throttle';

type HooksType = {
  targetRef: RefObject<HTMLElement | null>;
  onPrev: () => void;  
  onNext: () => void;

  // 휠(마우스/트랙패드)
  wheelAxis?: 'x' | 'y' | 'auto'; // 트랙패드는 보통 dy, 기본 'auto'
  wheelMinDelta?: number;
  wheelThrottleMs?: number; 
  // 스와이프(모바일 터치)
  swipeThresholdPx?: number;
  ignoreVertical?: boolean;  // 세로 이동이 더 크면 무시, 기본 true
  swipeCooldownMs?: number;  // 스와이프 후 쿨다운, 기본 250
};

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
 */
export function useCalendarSwipeWheelNav({
  targetRef,
  onPrev,
  onNext,
  wheelAxis = 'auto',
  wheelMinDelta = 3,
  wheelThrottleMs = 300,
  swipeThresholdPx = 48,
  ignoreVertical = true,
  swipeCooldownMs = 250,
}: HooksType) {
  // 최신 콜백 유지 (재렌더로 인한 throttle 취소 방지)
  const prevRef = useRef(onPrev);
  const nextRef = useRef(onNext);
  useEffect(() => { prevRef.current = onPrev; }, [onPrev]);
  useEffect(() => { nextRef.current = onNext; }, [onNext]);

  // 스와이프용 상태
  const startX = useRef(0);
  const startY = useRef(0);
  const swipeLockedUntil = useRef(0);
  const now = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());

  const shouldIgnoreTarget = (target: EventTarget | null) => {
    if (!(target instanceof HTMLElement)) return false;
    if (target.closest('[data-ignore-swipe]')) return true;
    const tag = target.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || target.isContentEditable) return true;
    return false;
  };

  // 휠 입력은 스로틀이 UX가 가장 자연스럽다
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

    // RBC 내부 월 그리드에 직접 바인딩 (이벤트 누락 방지)
    const el = (root.querySelector('.rbc-month-view') as HTMLElement) ?? root;

    // --- Wheel / Trackpad ---
    const onWheel = (e: WheelEvent) => {
      if (shouldIgnoreTarget(e.target)) return;

      const dx = e.deltaX;
      const dy = e.deltaY;

      const axis: 'x' | 'y' =
        wheelAxis === 'auto'
          ? (Math.abs(dx) >= Math.abs(dy) ? 'x' : 'y')
          : wheelAxis;

      const delta = axis === 'x' ? dx : dy;

      if (Math.abs(delta) < wheelMinDelta) return;
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
    ignoreVertical,
    swipeThresholdPx,
    swipeCooldownMs,
    navigateThrottled,
  ]);
}
