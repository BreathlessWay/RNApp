import { createReducer } from '@reduxjs/toolkit';

import {
	fetchUser,
	fetchUserFulfilled,
	FetchUserActionType,
	FetchUserFulfilledActionType,
} from './action';

export const initialAppState = {
	username: '',
};

export const appReducer = createReducer(initialAppState, {
	[fetchUser.type]: (state, action: FetchUserActionType) => {
		return {
			...state,
			username: action.payload.username,
		};
	},
	[fetchUserFulfilled.type]: (state, action: FetchUserFulfilledActionType) => {
		return {
			...state,
			username: action.payload.avatar_url,
		};
	},
});

export type AppStateType = ReturnType<typeof appReducer>;
