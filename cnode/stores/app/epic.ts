import { map, filter, catchError, switchMap, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';

import {
	fetchUser,
	fetchUserCancel,
	fetchUserFulfilled,
	fetchUserRejected,
	AppActionType,
} from './action';

import { Epic } from 'redux-observable';
import { UserResponseType } from 'cnode/stores/app/type';
import { RootStateType } from 'cnode/stores/rootType';
import { request } from 'cnode/utils/request';

// concat: 必须要等前一次订阅执行完成，才会再执行后面的订阅
// switch: 当新的订阅产生时，会退订之前的订阅，类似防抖，适用绝大多数场景
// merge: 多个订阅会同时执行

export const fetchUserEpic: Epic<
	AppActionType,
	AppActionType,
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
				// 	console.log(state$.value.app.username);
				// 	console.log(response);
				// 	// 所以这里直接返回action
				// 	return of(fetchUserFulfilled({ avatar_url: response.data.avatar_url }));
				// }),
				// concatAll(),
				// map内部使用MapOperator将map的callback转成observable
				map((result) => {
					console.log(state$.value.app.username);
					console.log({ result });
					// 所以这里直接返回action
					return fetchUserFulfilled({
						avatar_url: result.data.avatar_url,
					});
				}),
				catchError((error: Error, obs) => {
					console.log(state$.value.app.username);
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
