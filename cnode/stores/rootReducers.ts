import { combineReducers } from '@reduxjs/toolkit';

import { userReducer, initialUserState } from './user/reducer';

export const preloadedState = {
	user: initialUserState,
};

export const rootReducers = combineReducers({
	user: userReducer,
});
