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
	LogoutActionPayloadType,
} from './type';

// login
export const login = createAction<LoginActionPayloadType>('LOGIN');

export type LoginActionType = ReturnType<typeof login>;

// logout
export const logout = createAction<LogoutActionPayloadType>('LOGOUT');

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
	| FetchUserCancelActionType;
