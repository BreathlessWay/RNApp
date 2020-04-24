import { createAction } from '@reduxjs/toolkit';

import {
	FetchUserActionPayloadType,
	FetchUserCancelActionPayloadType,
	FetchUserFulfilledActionPayloadType,
	FetchUserRejectedActionPayloadType,
} from './type';

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

// AppActionType
export type AppActionType =
	| FetchUserActionType
	| FetchUserFulfilledActionType
	| FetchUserRejectedActionType
	| FetchUserCancelActionType;
