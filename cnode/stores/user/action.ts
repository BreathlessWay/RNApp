import { createAction } from '@reduxjs/toolkit';

import {
	FetchUserActionPayloadType,
	FetchUserCancelActionPayloadType,
	FetchUserFulfilledActionPayloadType,
	FetchUserRejectedActionPayloadType,
	GetMessageCountActionPayloadType,
	GetMessageCountFailedActionPayloadType,
	GetMessageCountSuccessActionPayloadType,
	LoginActionPayloadType,
	MakeCollectionActionPayloadType,
	MakeOutCollectionActionPayloadType,
} from './type';

// login
export const login = createAction<LoginActionPayloadType>('LOGIN');

export type LoginActionType = ReturnType<typeof login>;

// logout
export const logout = createAction('LOGOUT');

export type LogoutActionType = ReturnType<typeof logout>;

// getMessageCount
export const getMessageCount = createAction<GetMessageCountActionPayloadType>(
	'GET_MESSAGE_COUNT',
);

export type GetMessageCountActionType = ReturnType<typeof getMessageCount>;

// getMessageCountSuccess
export const getMessageCountSuccess = createAction<
	GetMessageCountSuccessActionPayloadType
>('GET_MESSAGE_COUNT_SUCCESS');

export type GetMessageCountSuccessActionType = ReturnType<
	typeof getMessageCountSuccess
>;

// getMessageCountFailed
export const getMessageCountFailed = createAction<
	GetMessageCountFailedActionPayloadType
>('GET_MESSAGE_COUNT_FAILED');

export type GetMessageCountFailedActionType = ReturnType<
	typeof getMessageCountFailed
>;

// fetchUser
export const fetchUser = createAction<FetchUserActionPayloadType>('FETCH_USER');

export type FetchUserActionType = ReturnType<typeof fetchUser>;

// fetchUserCancel
export const fetchUserCancel = createAction<FetchUserCancelActionPayloadType>(
	'FETCH_USER_CANCEL',
);

export type FetchUserCancelActionType = ReturnType<typeof fetchUserCancel>;

// fetchUserFulfilled
export const fetchUserFulfilled = createAction<
	FetchUserFulfilledActionPayloadType
>('FETCH_USER_FULFILLED');

export type FetchUserFulfilledActionType = ReturnType<
	typeof fetchUserFulfilled
>;

// fetchUserRejected
export const fetchUserRejected = createAction<
	FetchUserRejectedActionPayloadType
>('FETCH_USER_REJECTED');

export type FetchUserRejectedActionType = ReturnType<typeof fetchUserRejected>;

export const makeCollection = createAction<MakeCollectionActionPayloadType>(
	'MAKE_COLLECTION',
);

export type MakeCollectionActionType = ReturnType<typeof makeCollection>;

export const makeCollectionSuccess = createAction<
	MakeCollectionActionPayloadType
>('MAKE_COLLECTION_SUCCESS');

export type MakeCollectionSuccessActionType = ReturnType<
	typeof makeCollectionSuccess
>;

export const makeOutCollection = createAction<
	MakeOutCollectionActionPayloadType
>('MAKE_OUT_COLLECTION');

export type MakeOutCollectionActionType = ReturnType<typeof makeOutCollection>;

export const makeOutCollectionSuccess = createAction<
	MakeOutCollectionActionPayloadType
>('MAKE_OUT_COLLECTION_SUCCESS');

export type MakeOutCollectionSuccessActionType = ReturnType<
	typeof makeOutCollectionSuccess
>;

// UserActionType
export type UserActionType =
	| LoginActionType
	| LogoutActionType
	| GetMessageCountActionType
	| GetMessageCountSuccessActionType
	| GetMessageCountFailedActionType
	| FetchUserActionType
	| FetchUserFulfilledActionType
	| FetchUserRejectedActionType
	| FetchUserCancelActionType
	| MakeCollectionActionType
	| MakeCollectionSuccessActionType
	| MakeOutCollectionActionType
	| MakeOutCollectionSuccessActionType;
