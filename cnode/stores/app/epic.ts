import { Observable } from 'rxjs';
import { Epic, ofType } from 'redux-observable';

import { mergeMap, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import {
	AppActionType,
	FetchUserInputAction,
	FetchUserOutputAction,
} from './type';

import { fetchUserFulfilled } from './action';

export const fetchUserEpic: Epic<
	FetchUserInputAction,
	FetchUserOutputAction
> = (action$) =>
	action$.pipe(
		ofType(AppActionType.FETCH_USER),
		mergeMap((action) =>
			ajax
				.getJSON(`https://cnodejs.org/api/v1/user/${action.payload.username}`)
				.pipe(map((response: any) => fetchUserFulfilled(response))),
		),
	) as Observable<FetchUserOutputAction>;
