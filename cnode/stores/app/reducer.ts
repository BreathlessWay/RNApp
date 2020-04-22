import { handleActions, Action } from 'redux-actions';

import {
	AppAction$Type,
	AppActionType,
	AppStateType,
	FetchUserInputActionPayloadType,
	FetchUserOutputActionPayloadType,
} from './type';

export const initialAppState = {
	username: '',
};

export const appReducer = handleActions<AppStateType, any>(
	{
		[AppActionType.FETCH_USER]: (
			state: AppStateType,
			action: Action<FetchUserInputActionPayloadType>,
		) => {
			return {
				...state,
				username: action.payload.username,
			};
		},
		[AppActionType.FETCH_USER_FULFILLED]: (
			state: AppStateType,
			action: Action<FetchUserOutputActionPayloadType>,
		) => {
			return {
				...state,
				username: action.payload.avatar_url,
			};
		},
	},
	initialAppState,
);
