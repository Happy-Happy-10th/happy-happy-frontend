import { ApiCalendarSettingType } from '@/@types';
import { createStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type State = {
  settings: Omit<ApiCalendarSettingType, 'calendarId'> | null;
  isInitialized: boolean;
};
type Action = {
  setUserSetting: (settings: State) => void;
  setIsInitStore: (isInitStore: boolean) => void;
};

const defaultInitState: State = {
  settings: null,
  isInitialized: false,
};

export const useUserSettingStore = createStore<State & Action>()(
  persist<State & Action>(
    set => ({
      ...defaultInitState,
      setUserSetting: settings => {
        settings;
      },
      setIsInitStore: isInitialized => set(() => ({ isInitialized })),
    }),
    {
      name: 'user-Setting',
      storage: createJSONStorage(() => window.localStorage),
      onRehydrateStorage: () => settings => {
        settings?.setIsInitStore(true);
      },
    },
  ),
);
