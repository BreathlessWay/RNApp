import { Epic, ofType } from 'redux-observable';

import { map, flatMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import { AppActionType } from './type';

import {
	AppAction$Type,
	fetchUserFulfilled,
	FetchUserOutputAction,
	FetchUserInputAction,
} from './action';

export const fetchUserEpic: Epic<FetchUserInputAction, any> = (action$) =>
	action$.pipe(
		ofType(AppActionType.FETCH_USER),
		flatMap((action) =>
			ajax.getJSON(
				`https://cnodejs.org/api/v1/user/${action.payload.username}`,
			),
		),
		map((response: any) => fetchUserFulfilled(response)),
	);
