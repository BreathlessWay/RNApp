import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Epic } from 'redux-observable';
import { RootStateType } from 'cnode/stores/rootType';
import {
	getMessage,
	getMessageFailed,
	getMessageSuccess,
	MessageActionType,
} from './action';
import { MessageResultType } from './type';

import { request } from 'cnode/utils/request';

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
