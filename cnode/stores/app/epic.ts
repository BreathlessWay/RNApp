import { map, switchMap, filter, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';

import { Epic } from 'redux-observable';

import {
	fetchUser,
	fetchUserFulfilled,
	fetchUserRejected,
	AppActionType,
} from './action';

export const fetchUserEpic: Epic<AppActionType, AppActionType> = (action$) =>
	action$.pipe(
		filter(fetchUser.match),
		switchMap((action) =>
			ajax.getJSON(
				`https://cnodejs.org/api/v1/user/${action.payload.username}`,
			),
		),
		map((response: any) => {
			console.log(response);
			return fetchUserFulfilled({ avatar_url: response.data.avatar_url });
		}),
		catchError((error: Error) =>
			of(fetchUserRejected({ error: error.message })),
		),
	);
