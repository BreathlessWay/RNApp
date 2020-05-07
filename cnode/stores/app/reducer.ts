import { createReducer } from '@reduxjs/toolkit';

import { AppStateType } from './type';

export const initialAppState: AppStateType = {};

export const appReducer = createReducer<AppStateType>(initialAppState, {});
