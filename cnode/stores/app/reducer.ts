import { createReducer, PayloadAction } from '@reduxjs/toolkit';

import {
	AppActionType,
	AppStateType,
	FetchUserInputActionPayloadType,
	FetchUserOutputActionPayloadType,
} from './type';
import { fetchUser } from 'cnode/stores/app/action';

export const initialAppState = {
	username: '',
};

export const appReducer = createReducer<AppStateType>(initialAppState, {
	[fetchUser.type]: (
		state,
		action: PayloadAction<FetchUserInputActionPayloadType>,
	) => {
		return {
			...state,
			username: action.payload.username,
		};
	},
	[AppActionType.FETCH_USER_FULFILLED]: (
		state,
		action: PayloadAction<FetchUserOutputActionPayloadType>,
	) => {
		return {
			...state,
			username: action.payload.avatar_url,
		};
	},
});
