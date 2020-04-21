import { Observable } from 'rxjs';
import { Epic, ofType } from 'redux-observable';

import { mergeMap, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import { AppActionType } from 'cnode/stores/app/type';

import { fetchUserFulfilled } from './action';

export interface FetchUserInputAction {
	type: string;
	payload: {
		username: string;
	};
}

export interface FetchUserOutputAction {
	type: string;
	payload: {};
}

export const fetchUserEpic: Epic<FetchUserInputAction> = (action$) =>
	action$.pipe(
		ofType(AppActionType.FETCH_USER),
		mergeMap((action) =>
			ajax
				.getJSON(`https://cnodejs.org/api/v1/user/${action.payload.username}`)
				.pipe(map((response) => fetchUserFulfilled(response))),
		),
	) as Observable<FetchUserOutputAction>;
