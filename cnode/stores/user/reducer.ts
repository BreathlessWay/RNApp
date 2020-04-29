import { createReducer } from '@reduxjs/toolkit';

import {
	fetchUser,
	fetchUserCancel,
	fetchUserFulfilled,
	fetchUserRejected,
	FetchUserActionType,
	FetchUserFulfilledActionType,
	FetchUserRejectedActionType,
	login,
	loginSuccess,
	LoginActionType,
	LoginSuccessActionType,
	loginFailed,
} from './action';

export const initialUserState = {
	loading: false,
	accesstoken: '',
	username: '',
	avatar_url: '',
	error: '',
	loginname: '',
	githubUsername: '',
	create_at: '',
	score: 0,
	recent_topics: [],
	recent_replies: [],
};

export type UserStateType = Readonly<typeof initialUserState>;

export const userReducer = createReducer<UserStateType>(initialUserState, {
	[login.type]: (state, action: LoginActionType) => {
		return {
			...state,
			loading: true,
			accesstoken: action.payload.accesstoken,
		};
	},
	[loginSuccess.type]: (state, action: LoginSuccessActionType) => {
		return {
			...state,
			loading: false,
			...action.payload,
		};
	},
	[loginFailed.type]: (state, action: LoginSuccessActionType) => {
		return {
			...state,
			loading: false,
			accesstoken: '',
			...action.payload,
		};
	},
	[fetchUser.type]: (state, action: FetchUserActionType) => {
		return {
			...state,
			username: action.payload.username,
		};
	},
	[fetchUserCancel.type]: (state) => {
		return {
			...state,
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
