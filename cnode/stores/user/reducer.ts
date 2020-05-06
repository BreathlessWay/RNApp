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
	makeCollection,
	MakeCollectionActionType,
	makeCollectionSuccess,
	makeOutCollection,
	MakeOutCollectionActionType,
	getCollections,
	GetCollectionsActionType,
	getCollectionsSuccess,
	GetCollectionsSuccessActionType,
	GetCollectionsFailedActionType,
	getCollectionsFailed,
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
	collection: [],
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
			collection: [],
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
	[makeCollection.type]: (state, action: MakeCollectionActionType) => {
		return {
			...state,
			loading: true,
		};
	},
	[makeCollectionSuccess.type]: (state, action: MakeCollectionActionType) => {
		const _collection = state.collection.concat([action.payload.item]);
		return {
			...state,
			loading: false,
			collection: _collection,
		};
	},
	[makeOutCollection.type]: (state, action: MakeOutCollectionActionType) => {
		return {
			...state,
			loading: true,
		};
	},
	[makeCollectionSuccess.type]: (
		state,
		action: MakeOutCollectionActionType,
	) => {
		const _collection = state.collection.filter(
			(item) => item.id !== action.payload.id,
		);
		return {
			...state,
			loading: false,
			collection: _collection,
		};
	},
	[getCollections.type]: (state, action: GetCollectionsActionType) => {
		return {
			...state,
			error: '',
			loading: true,
		};
	},
	[getCollectionsSuccess.type]: (
		state,
		action: GetCollectionsSuccessActionType,
	) => {
		return {
			...state,
			loading: false,
			collection: action.payload.list,
		};
	},
	[getCollectionsFailed.type]: (
		state,
		action: GetCollectionsFailedActionType,
	) => {
		return {
			...state,
			loading: false,
			error: action.payload.error,
		};
	},
});
