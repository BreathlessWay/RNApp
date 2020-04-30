import { combineReducers } from '@reduxjs/toolkit';

import { userReducer, initialUserState } from './user/reducer';
import { initialTopicsState, topicsReducer } from './topics/reducer';

export const preloadedState = {
	user: initialUserState,
	topics: initialTopicsState,
};

export const rootReducers = combineReducers({
	user: userReducer,
	topics: topicsReducer,
});
