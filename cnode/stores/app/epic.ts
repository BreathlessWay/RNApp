import { map, flatMap, filter } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import { ActionsObservable } from 'redux-observable';
import { fetchUser, fetchUserFulfilled, FetchUserActionType } from './action';

export const fetchUserEpic = (
	action$: ActionsObservable<FetchUserActionType>,
) =>
	action$.pipe(
		filter(fetchUser.match),
		flatMap((action) =>
			ajax.getJSON(
				`https://cnodejs.org/api/v1/user/${action.payload.username}`,
			),
		),
		map((response: any) => fetchUserFulfilled(response)),
	);
