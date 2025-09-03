'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

import { cn } from '@/utils/tailwind-utils';
import { useSidePanelStore } from '@/store';

type Props = {
  anchorId: string;
  title?: string;
  width?: number | string; // 예: 360 | "clamp(280px, 38vw, 420px)"
  showOverlay?: boolean; // 컨테이너 내부에 반투명 배경 필요 시
  className?: string; // 패널 박스 자체 커스터마이징
  children?: React.ReactNode;
};

export function SidePanel({
  anchorId,
  title,
  width = 'clamp(280px, 38vw, 460px)',
  showOverlay = false,
  className,
  children,
}: Props) {
  const isOpen = useSidePanelStore(s => s.isOpen(anchorId));
  const close = useSidePanelStore(s => s.close);
  const getContainer = useSidePanelStore(s => s.getContainer);

  // Hydration-safe: 클라이언트 마운트 후에만 container를 잡아준다
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const containerEl = mounted ? getContainer(anchorId) : null;

  // 컨테이너가 아직 없다면 아무것도 그리지 않음(SSR 깜빡임 방지)
  if (!containerEl) {
    return null;
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={v => (v ? null : close())} modal={false}>
      <Dialog.Portal container={containerEl}>
        {/* 선택: 컨테이너 내부에만 깔리는 오버레이 */}
        <AnimatePresence>
          {showOverlay && isOpen && (
            <motion.div
              key="overlay"
              className="absolute inset-0 bg-black/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <Dialog.Content asChild forceMount>
              <motion.aside
                key="panel"
                initial={{ x: '100%', opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 1 }}
                transition={{ type: 'tween', duration: 0.22 }}
                className={cn(
                  // 컨테이너 기준 배치
                  'absolute top-0 right-0 h-full',
                  // 박스 스타일
                  'bg-yoteyo-bg-modal shadow-xl rounded-l-2xl',
                  'flex flex-col',
                  'z-[60]',
                  className,
                )}
                style={{ width }}
              >
                <Dialog.Title className="sr-only">{title ?? 'Details'}</Dialog.Title>
                {/* <Dialog.Close
                    onClick={close}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg hover:bg-black/5"
                  >
                    <X size={18} />
                  </Dialog.Close> */}

                <div className="flex-1 overflow-auto p-4">{children}</div>
              </motion.aside>
            </Dialog.Content>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
