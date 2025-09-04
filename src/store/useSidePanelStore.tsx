import { create } from 'zustand';
import type { CalendarEventType } from '@/@types/calendar';

type AnchorId = string;
export type PanelType = 'setting' | 'create' | 'fix' | 'check';

type State = {
  openId: AnchorId | null;
  anchors: Record<AnchorId, HTMLElement | null>;
  panelType: PanelType | null;
  /** 패널에서 사용할 현재 이벤트(없을 수 있음) */
  currentEvent: CalendarEventType | null;
};

type Actions = {
  register: (id: AnchorId, el: HTMLElement | null) => void;
  unregister: (id: AnchorId) => void;

  /** type과 payload(event)를 한 번에 세팅 */
  open: (id: AnchorId, type?: PanelType, payload?: { event?: CalendarEventType | null }) => void;
  close: () => void;
  toggle: (id: AnchorId, type?: PanelType, payload?: { event?: CalendarEventType | null }) => void;

  /** 헬퍼 */
  getContainer: (id: AnchorId) => HTMLElement | null;
  isOpen: (id: AnchorId) => boolean;
  isOpenOf: (id: AnchorId, type?: PanelType) => boolean;

  /** 개별 세터 */
  setPanelType: (type: PanelType) => void;
  setCurrentEvent: (event: CalendarEventType | null) => void;
};

export const useSidePanelStore = create<State & Actions>((set, get) => ({
  openId: null,
  anchors: {},
  panelType: null,
  currentEvent: null,

  register: (id, el) => set(s => ({ anchors: { ...s.anchors, [id]: el } })),

  unregister: id =>
    set(s => {
      const next = { ...s.anchors };
      delete next[id];
      const shouldClose = s.openId === id ? { openId: null, panelType: null, currentEvent: null } : {};
      return { anchors: next, ...shouldClose };
    }),

  open: (id, type, payload) =>
    set(s => ({
      openId: id,
      panelType: type ?? s.panelType ?? 'setting',
      currentEvent: payload?.event ?? null,
    })),

  close: () => set({ openId: null, panelType: null, currentEvent: null }),

  toggle: (id, type, payload) =>
    set(s =>
      s.openId === id
        ? { openId: null, panelType: null, currentEvent: null }
        : {
            openId: id,
            panelType: type ?? s.panelType ?? 'setting',
            currentEvent: payload?.event ?? null,
          },
    ),

  getContainer: id => get().anchors[id] ?? null,
  isOpen: id => get().openId === id,
  isOpenOf: (id, type) => get().openId === id && (type ? get().panelType === type : true),

  setPanelType: type => set({ panelType: type }),
  setCurrentEvent: event => set({ currentEvent: event }),
}));
