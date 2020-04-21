import { createAction } from 'redux-actions';

import { AppActionType } from './type';

// 异步的action不能用createAction，因为createAction返回的是一个对象，而不是一个函数
export const fetchUser = createAction<{ username: string }>(
	AppActionType.FETCH_USER,
);

export const fetchUserFulfilled = createAction(
	AppActionType.FETCH_USER_FULFILLED,
);
