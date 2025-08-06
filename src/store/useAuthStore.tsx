import { MemberInfo } from '@/@types';
import { createStore } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type State = { user: MemberInfo | null; isInitialized: boolean };
type Action = {
  setUser: (user: MemberInfo | null) => void;
  setIsInitStore: (isInitStore: boolean) => void;
};

export const defaultInitState: State = {
  user: null,
  isInitialized: false,
};

export const useAuthStore = createStore<State & Action>()(
  persist<State & Action>(
    set => ({
      ...defaultInitState,
      setUser: user => set(() => ({ user })),
      setIsInitStore: isInitialized => set(() => ({ isInitialized })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => window.localStorage),
      onRehydrateStorage: () => state => {
        state?.setIsInitStore(true);
      },
    },
  ),
);
