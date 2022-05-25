import { createTrackedSelector } from 'react-tracked';
import create from 'zustand';
import produce from 'immer';

export interface SystemStoreState {}

interface SystemStoreAction {}

const SystemStore = create<SystemStoreState & SystemStoreAction>(set => ({}));

export const useSystemStore = createTrackedSelector(SystemStore);

export const getSystemStore = () => ({ ...SystemStore });
