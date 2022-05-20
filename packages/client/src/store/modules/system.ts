import { createTrackedSelector } from 'react-tracked';
import type { LocaleTypes } from '@/locales/types';
import create from 'zustand';
import produce from 'immer';

export type { SystemStoreState };

export { useSystemStore, getSystemStore };

interface SystemStoreState {
  currentLocale: LocaleTypes;
}

interface SystemStoreAction {
  setCurrentLocale(locale: SystemStoreState['currentLocale']): void;
}

const SystemStore = create<SystemStoreState & SystemStoreAction>(set => ({
  currentLocale: systemUtils.initLocale(),
  setCurrentLocale: locale =>
    set(
      produce((state: SystemStoreState) => {
        state.currentLocale = locale;
      })
    )
}));

const useSystemStore = createTrackedSelector(SystemStore);
const getSystemStore = () => ({ ...SystemStore });

const systemUtils = {
  initLocale(): LocaleTypes {
    const cacheLocale = localStorage.getItem('app_select_locale');

    return (cacheLocale ?? 'zh-CN') as LocaleTypes;
  }
};
