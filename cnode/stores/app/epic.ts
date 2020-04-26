import { map, filter, catchError, mergeMap, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';

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

export const fetchUserEpic: Epic<
	AppActionType,
	AppActionType,
	RootStateType
> = (action$, state$) =>
	action$.pipe(
		filter(fetchUser.match),
		mergeMap((action) =>
			ajax
				.getJSON<UserResponseType>(
					`https://cnodejs.org/api/v1/user/${action.payload.username}`,
				)
				.pipe(
					map((response) => {
						console.log(state$.value.app.username);
						console.log(response);
						return fetchUserFulfilled({ avatar_url: response.data.avatar_url });
					}),
					catchError((error: Error) => {
						console.log(state$.value.app.username);
						console.log(error.message, '!!!', error.name);
						return of(fetchUserRejected({ error: error.message }));
					}),
					takeUntil(action$.pipe(filter(fetchUserCancel.match))),
				),
		),
	);
