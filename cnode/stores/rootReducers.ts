import { combineReducers } from 'redux';

import { appReducer, initialAppState } from './app/reducer';

export const preloadedState = {
	app: initialAppState,
};

export const rootReducers = combineReducers({
	app: appReducer,
});
