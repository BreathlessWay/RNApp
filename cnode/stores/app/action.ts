import { createAction } from '@reduxjs/toolkit';

import {
	AppActionType,
	FetchUserInputActionPayloadType,
	FetchUserOutputActionPayloadType,
} from './type';

export const fetchUser = createAction<
	FetchUserInputActionPayloadType,
	AppActionType
>(AppActionType.FETCH_USER);

export const fetchUserFulfilled = createAction<
	FetchUserOutputActionPayloadType,
	AppActionType
>(AppActionType.FETCH_USER_FULFILLED);

export type FetchUserInputAction = ReturnType<typeof fetchUser>;

export type FetchUserOutputAction = ReturnType<typeof fetchUserFulfilled>;

export type AppAction$Type = FetchUserInputAction | FetchUserOutputAction;
