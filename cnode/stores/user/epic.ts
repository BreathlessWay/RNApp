import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';

import {
	fetchUser,
	fetchUserCancel,
	fetchUserFulfilled,
	fetchUserRejected,
	login,
	loginFailed,
	loginSuccess,
	UserActionType,
} from './action';

import { Epic } from 'redux-observable';
import { LoginResponseType, UserResponseType } from './type';
import { RootStateType } from 'cnode/stores/rootType';

import { EMethod, request } from 'cnode/utils/request';

// concat: 必须要等前一次订阅执行完成，才会再执行后面的订阅
// switch: 当新的订阅产生时，会退订之前的订阅，类似防抖，适用绝大多数场景
// merge: 多个订阅会同时执行

export const loginEpic: Epic<UserActionType, UserActionType> = (action$) =>
	action$.pipe(
		filter(login.match),
		switchMap((action) =>
			request<LoginResponseType>({
				url: `/accesstoken`,
				method: EMethod.POST,
				body: {
					accesstoken: action.payload.accesstoken,
				},
			}).pipe(
				map((result) => {
					console.log({ result });
					return fetchUser({ username: result.loginname });
				}),
				catchError((error: Error) => {
					return of(loginFailed({ error: error.message }));
				}),
			),
		),
	);

export const fetchUserEpic: Epic<
	UserActionType,
	UserActionType,
	RootStateType
> = (action$, state$) =>
	action$.pipe(
		filter(fetchUser.match),
		switchMap((action) =>
			request<UserResponseType>({
				url: `/user/${action.payload.username}`,
				customError: true,
			}).pipe(
				// 如果return一个observable对象，则需要用concatAll平铺
				// map((response) => {
				// 	console.log(state$.value.user.username);
				// 	console.log(response);
				// 	// 所以这里直接返回action
				// 	return of(fetchUserFulfilled({ avatar_url: response.data.avatar_url }));
				// }),
				// concatAll(),
				// map内部使用MapOperator将map的callback转成observable
				map((result) => {
					console.log(state$.value.user.username);
					console.log({ result });
					// 所以这里直接返回action
					return fetchUserFulfilled(result.data);
				}),
				catchError((error: Error, obs) => {
					console.log(state$.value.user.username);
					console.log(error.message, '!!!', error.name);
					// of: 将普通对象转为observable
					return of(fetchUserRejected({ error: error.message }));
					// 当请求失败时重试
					// return obs.pipe(delay(500));
				}),
				// takeUntil: 当接收到cancel的action时停止ajax请求
				// 这个takeUntil需要在ajax的pipe中，因为是针对ajax的中断
				takeUntil(action$.pipe(filter(fetchUserCancel.match))),
			),
		),
	);
