import { create } from 'zustand';

type AppStoreState = {
  appName: string;
  setAppName: (value: string) => void;
};

export const useAppStore = create<AppStoreState>((set) => ({
  appName: 'YouTube Growth RPG',
  setAppName: (value) => set({ appName: value })
}));
