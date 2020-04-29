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
	LoginFailedActionType,
	logout,
} from './action';

import { UserStateType } from './type';

export const initialUserState: UserStateType = {
	isLogin: false,
	loading: false,
	error: '',
	accesstoken: '',
	id: '',
	userInfo: null,
};

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
			isLogin: true,
			...action.payload,
		};
	},
	[loginFailed.type]: (state, action: LoginFailedActionType) => {
		return {
			...state,
			loading: false,
			isLogin: false,
			accesstoken: '',
			...action.payload,
			userInfo: null,
		};
	},
	[logout.type]: () => {
		return {
			isLogin: false,
			loading: false,
			error: '',
			accesstoken: '',
			id: '',
			userInfo: null,
		};
	},
	[fetchUser.type]: (state, action: FetchUserActionType) => {
		return {
			...state,
			loading: true,
			isLogin: false,
			error: '',
			id: action.payload.id,
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
			loading: false,
			isLogin: true,
			userInfo: action.payload,
		};
	},
	[fetchUserRejected.type]: (state, action: FetchUserRejectedActionType) => {
		return {
			...state,
			loading: false,
			isLogin: false,
			accesstoken: '',
			error: action.payload.error,
			userInfo: null,
		};
	},
});
