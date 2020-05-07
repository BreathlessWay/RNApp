import { combineReducers } from '@reduxjs/toolkit';

import { userReducer, initialUserState } from './user/reducer';
import { initialTopicsState, topicsReducer } from './topics/reducer';
import { appReducer, initialAppState } from 'cnode/stores/app/reducer';

export const preloadedState = {
	app: initialAppState,
	user: initialUserState,
	topics: initialTopicsState,
};

export const rootReducers = combineReducers({
	app: appReducer,
	user: userReducer,
	topics: topicsReducer,
});
