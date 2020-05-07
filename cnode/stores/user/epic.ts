import {
	catchError,
	concatAll,
	delay,
	filter,
	map,
	switchMap,
	take,
	takeUntil,
} from 'rxjs/operators';
import { of } from 'rxjs';

import {
	fetchUser,
	fetchUserCancel,
	fetchUserFulfilled,
	fetchUserRejected,
	getCollections,
	getCollectionsFailed,
	getCollectionsSuccess,
	getMessageCount,
	getMessageCountFailed,
	getMessageCountSuccess,
	login,
	makeCollection,
	makeCollectionSuccess,
	makeOutCollection,
	makeOutCollectionSuccess,
	UserActionType,
} from './action';

import { Epic } from 'redux-observable';
import {
	GetCollectionsResultType,
	GetMessageCountResponseType,
	LoginResponseType,
	UserResponseType,
} from './type';
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
				map((result) =>
					of(
						fetchUser(result),
						getMessageCount({ accesstoken: action.payload.accesstoken }),
					),
				),
				concatAll(),
				catchError((error: Error) => {
					return of(fetchUserRejected({ error: error.message }));
				}),
			),
		),
	);

export const messageCountEpic: Epic<UserActionType, UserActionType> = (
	action$,
) =>
	action$.pipe(
		filter(getMessageCount.match),
		switchMap((action) =>
			request<GetMessageCountResponseType>({
				url: `/message/count?accesstoken=${action.payload.accesstoken}`,
			}).pipe(
				map((result) => {
					return getMessageCountSuccess(result);
				}),
				catchError((error: Error) => {
					return of(getMessageCountFailed({ error: error.message }));
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
				url: `/user/${action.payload.loginname}`,
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
					// 所以这里直接返回action
					return fetchUserFulfilled(result.data);
				}),
				catchError((error: Error, obs) => {
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

export const makeCollectionEpic: Epic<
	UserActionType,
	UserActionType,
	RootStateType
> = (action$, state$) =>
	action$.pipe(
		filter(makeCollection.match),
		switchMap((action) =>
			request({
				url: '/topic_collect/collect',
				method: EMethod.POST,
				body: {
					accesstoken: state$.value.user.accesstoken,
					topic_id: action.payload.item.id,
				},
			}).pipe(
				map(() => makeCollectionSuccess({ item: action.payload.item })),
				catchError((err, obs) => obs.pipe(delay(500))), // 当请求失败时重试
				take(3), // 重试3次
			),
		),
	);

export const makeOutCollectionEpic: Epic<
	UserActionType,
	UserActionType,
	RootStateType
> = (action$, state$) =>
	action$.pipe(
		filter(makeOutCollection.match),
		switchMap((action) =>
			request({
				url: '/topic_collect/de_collect',
				method: EMethod.POST,
				body: {
					accesstoken: state$.value.user.accesstoken,
					topic_id: action.payload.id,
				},
			}).pipe(
				map(() => makeOutCollectionSuccess({ id: action.payload.id })),
				catchError((err, obs) => obs.pipe(delay(500))), // 当请求失败时重试
				take(3), // 重试3次
			),
		),
	);

export const getCollectionsEpic: Epic<
	UserActionType,
	UserActionType,
	RootStateType
> = (action$, state$) =>
	action$.pipe(
		filter(getCollections.match),
		switchMap((action) =>
			request<GetCollectionsResultType>({
				url: `/topic_collect/${state$.value.user.userInfo?.loginname}`,
			}).pipe(
				map((result) => getCollectionsSuccess({ list: result.data })),
				catchError((err: Error) =>
					of(getCollectionsFailed({ error: err.message })),
				),
			),
		),
	);
