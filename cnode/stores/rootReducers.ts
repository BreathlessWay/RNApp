import { combineReducers } from '@reduxjs/toolkit';

import { appReducer, initialAppState } from './app/reducer';

export const preloadedState = {
	app: initialAppState,
};

export const rootReducers = combineReducers({
	app: appReducer,
});
