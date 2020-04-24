import { createReducer } from '@reduxjs/toolkit';

import {
	fetchUser,
	fetchUserCancel,
	fetchUserFulfilled,
	fetchUserRejected,
	FetchUserActionType,
	FetchUserFulfilledActionType,
	FetchUserRejectedActionType,
	FetchUserCancelActionType,
} from './action';

export const initialAppState = {
	username: '',
	avatar_url: '',
	error: '',
};

export type AppStateType = Readonly<typeof initialAppState>;

export const appReducer = createReducer<AppStateType>(initialAppState, {
	[fetchUser.type]: (state, action: FetchUserActionType) => {
		return {
			...state,
			username: action.payload.username,
		};
	},
	[fetchUserCancel.type]: (state, action: FetchUserCancelActionType) => {
		return {
			...state,
			username: action.payload.token,
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
