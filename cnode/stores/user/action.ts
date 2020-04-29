import { createAction } from '@reduxjs/toolkit';

import {
	FetchUserActionPayloadType,
	FetchUserCancelActionPayloadType,
	FetchUserFulfilledActionPayloadType,
	FetchUserRejectedActionPayloadType,
	LoginActionPayloadType,
	LoginFailedActionPayloadType,
	LoginSuccessActionPayloadType,
} from './type';

// login
export const login = createAction<LoginActionPayloadType>('LOGIN');

export type LoginActionType = ReturnType<typeof login>;

// loginSuccess
export const loginSuccess = createAction<LoginSuccessActionPayloadType>(
	'LOGIN_SUCCESS',
);

export type LoginSuccessActionType = ReturnType<typeof loginSuccess>;

// loginFailed
export const loginFailed = createAction<LoginFailedActionPayloadType>(
	'LOGIN_FAILED',
);

export type LoginFailedActionType = ReturnType<typeof loginFailed>;

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
	| LoginSuccessActionType
	| LoginFailedActionType
	| FetchUserActionType
	| FetchUserFulfilledActionType
	| FetchUserRejectedActionType
	| FetchUserCancelActionType;
