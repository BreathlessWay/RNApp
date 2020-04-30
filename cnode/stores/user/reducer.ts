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
	LoginActionType,
	logout,
	getMessageCount,
	getMessageCountSuccess,
	getMessageCountFailed,
	GetMessageCountFailedActionType,
	GetMessageCountSuccessActionType,
} from './action';

import { UserStateType } from './type';

export const initialUserState: UserStateType = {
	isLogin: false,
	loading: false,
	error: '',
	accesstoken: '',
	id: '',
	count: 0,
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
	[logout.type]: () => {
		return {
			isLogin: false,
			loading: false,
			error: '',
			accesstoken: '',
			id: '',
			count: 0,
			userInfo: null,
		};
	},
	[getMessageCount.type]: (state) => {
		return {
			...state,
		};
	},
	[getMessageCountSuccess.type]: (
		state,
		action: GetMessageCountSuccessActionType,
	) => {
		return {
			...state,
			count: action.payload.data,
		};
	},
	[getMessageCountFailed.type]: (
		state,
		action: GetMessageCountFailedActionType,
	) => {
		return {
			...state,
			error: action.payload.error,
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
