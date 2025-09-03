import { create } from 'zustand';

type AnchorId = string;

type State = {
  openId: AnchorId | null;
  anchors: Record<AnchorId, HTMLElement | null>;
};

type Actions = {
  register: (id: AnchorId, el: HTMLElement | null) => void;
  unregister: (id: AnchorId) => void;
  open: (id: AnchorId) => void;
  close: () => void;
  toggle: (id: AnchorId) => void;
  getContainer: (id: AnchorId) => HTMLElement | null;
  isOpen: (id: AnchorId) => boolean;
};

export const useSidePanelStore = create<State & Actions>((set, get) => ({
  openId: null,
  anchors: {},

  register: (id, el) => set(s => ({ anchors: { ...s.anchors, [id]: el } })),

  unregister: id =>
    set(s => {
      const next = { ...s.anchors };
      delete next[id];
      // 등록 해제된 앵커가 열려있으면 닫아준다
      const shouldClose = s.openId === id ? { openId: null } : {};
      return { anchors: next, ...shouldClose };
    }),

  open: id => set({ openId: id }),
  close: () => set({ openId: null }),
  toggle: id => set(s => ({ openId: s.openId === id ? null : id })),

  getContainer: id => get().anchors[id] ?? null,
  isOpen: id => get().openId === id,
}));
