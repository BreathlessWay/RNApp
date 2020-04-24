import { map, switchMap, filter, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';

import {
	fetchUser,
	fetchUserFulfilled,
	fetchUserRejected,
	AppActionType,
} from './action';

import { Epic } from 'redux-observable';
import { UserResponseType } from 'cnode/stores/app/type';

export const fetchUserEpic: Epic<AppActionType, AppActionType> = (action$) =>
	action$.pipe(
		filter(fetchUser.match),
		switchMap((action) => {
			console.log(action);
			return ajax.getJSON<UserResponseType>(
				`https://cnodejs.org/api/v1/user/${action.payload.username}`,
			);
		}),
		map((response: UserResponseType) => {
			console.log(response);
			return fetchUserFulfilled({ avatar_url: response.data.avatar_url });
		}),
		catchError((error: Error) => {
			console.log(error.message, '!!!', error.name);
			return of(fetchUserRejected({ error: error.message }));
		}),
	);
