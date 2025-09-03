'use client';
import { useSidePanelStore } from '@/store';
import { useEffect, useRef } from 'react';

type Props = {
  anchorId: string;
  className?: string; // 필요시 style 조정
  children?: React.ReactNode;
};

/**
 * 이 컴포넌트가 렌더되는 엘리먼트 자체가 "패널 기준 컨테이너"가 됩니다.
 * position 컨텍스트를 주기 위해 기본적으로 relative를 추천합니다.
 */
export function SidePanelWrapper({ anchorId, className, children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const register = useSidePanelStore(s => s.register);
  const unregister = useSidePanelStore(s => s.unregister);

  useEffect(() => {
    register(anchorId, ref.current);
    return () => unregister(anchorId);
  }, [anchorId, register, unregister]);

  return (
    <div ref={ref} className={className ?? 'relative overflow-x-visible'}>
      {children}
    </div>
  );
}
