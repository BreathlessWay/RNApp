import { createReducer } from '@reduxjs/toolkit';

import { AppStateType } from './type';

import {
	fetchUser,
	fetchUserFulfilled,
	FetchUserInputAction,
	FetchUserOutputAction,
} from './action';

export const initialAppState = {
	username: '',
};

export const appReducer = createReducer<AppStateType>(initialAppState, {
	[fetchUser.type]: (state, action: FetchUserInputAction) => {
		return {
			...state,
			username: action.payload.username,
		};
	},
	[fetchUserFulfilled.type]: (state, action: FetchUserOutputAction) => {
		return {
			...state,
			username: action.payload.avatar_url,
		};
	},
});
