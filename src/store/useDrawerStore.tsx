import { create } from 'zustand';
import { ReactNode } from 'react';

type DrawerPayload = {
  /** Drawer 안에 렌더할 콘텐츠 */
  content: ReactNode;
  /** 닫힐 때 실행할 콜백(선택) */
  onClose?: () => void;
};

type DrawerState = {
  /** (deprecated) isOpen과 동일 — 기존 코드 호환용 */
  open: boolean;
  /** 열림 여부 (권장 사용) */
  isOpen: boolean;

  content: ReactNode | null;
  onClose?: () => void;

  openDrawer: (payload: DrawerPayload) => void;
  closeDrawer: () => void;
};

export const useDrawerStore = create<DrawerState>((set, get) => ({
  open: false,
  isOpen: false,
  content: null,
  onClose: undefined,

  openDrawer: ({ content, onClose }) =>
    set({
      open: true,
      isOpen: true,
      content,
      onClose,
    }),

  closeDrawer: () => {
    const cb = get().onClose;
    cb?.();
    set({
      open: false,
      isOpen: false,
      content: null,
      onClose: undefined,
    });
  },
}));
