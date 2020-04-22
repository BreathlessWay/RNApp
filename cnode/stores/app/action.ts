import { createAction } from 'redux-actions';

import {
	AppActionType,
	FetchUserInputActionPayloadType,
	FetchUserOutputActionPayloadType,
} from './type';

// 异步的action不能用createAction，因为createAction返回的是一个对象，而不是一个函数
export const fetchUser = createAction<FetchUserInputActionPayloadType>(
	AppActionType.FETCH_USER,
);

export const fetchUserFulfilled = createAction<
	FetchUserOutputActionPayloadType
>(AppActionType.FETCH_USER_FULFILLED);
