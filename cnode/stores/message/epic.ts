import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Epic } from 'redux-observable';
import { RootStateType } from 'cnode/stores/rootType';
import {
	getMessage,
	getMessageFailed,
	getMessageSuccess,
	markAllRead,
	markAllReadFailed,
	markAllReadSuccess,
	markRead,
	markReadFailed,
	markReadSuccess,
	MessageActionType,
} from './action';
import { MarkAllReadResultType, MessageResultType } from './type';

import { EMethod, request } from 'cnode/utils/request';

export const getMessageEpic: Epic<
	MessageActionType,
	MessageActionType,
	RootStateType
> = (action$, state$) =>
	action$.pipe(
		filter(getMessage.match),
		switchMap((action) =>
			request<MessageResultType>({
				url: `/messages?accesstoken=${state$.value.user.accesstoken}`,
			}).pipe(
				map((result) => {
					return getMessageSuccess({
						has_read_messages: result.data.has_read_messages,
						hasnot_read_messages: result.data.hasnot_read_messages,
					});
				}),
				catchError((err: Error) =>
					of(getMessageFailed({ error: err.message })),
				),
			),
		),
	);

export const markReadEpic: Epic<
	MessageActionType,
	MessageActionType,
	RootStateType
> = (action$, state$) =>
	action$.pipe(
		filter(markRead.match),
		switchMap((action) =>
			request({
				url: `/message/mark_one/${action.payload.messageId}`,
				method: EMethod.POST,
				body: {
					accesstoken: state$.value.user.accesstoken,
				},
			}).pipe(
				map(() => {
					return markReadSuccess({ messageId: action.payload.messageId });
				}),
				catchError((err: Error) => of(markReadFailed({ error: err.message }))),
			),
		),
	);

export const markAllReadEpic: Epic<
	MessageActionType,
	MessageActionType,
	RootStateType
> = (action$, state$) =>
	action$.pipe(
		filter(markAllRead.match),
		switchMap((action) =>
			request<MarkAllReadResultType>({
				url: `/message/mark_all`,
				method: EMethod.POST,
				body: {
					accesstoken: state$.value.user.accesstoken,
				},
			}).pipe(
				map((result) => {
					const messageIds = result.marked_msgs.map((item) => item.id);
					return markAllReadSuccess({ messageIds });
				}),
				catchError((err: Error) =>
					of(markAllReadFailed({ error: err.message })),
				),
			),
		),
	);
