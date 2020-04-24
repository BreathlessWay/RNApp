import { createReducer } from '@reduxjs/toolkit';

import {
	fetchUser,
	fetchUserFulfilled,
	fetchUserRejected,
	FetchUserActionType,
	FetchUserFulfilledActionType,
	FetchUserRejectedActionType,
} from './action';

export const initialAppState = {
	username: '',
	avatar_url: '',
	error: '',
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
			avatar_url: action.payload.avatar_url,
		};
	},
	[fetchUserRejected.type]: (state, action: FetchUserRejectedActionType) => {
		return {
			...state,
			error: action.payload.error,
		};
	},
});

export type AppStateType = ReturnType<typeof appReducer>;
