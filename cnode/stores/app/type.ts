export enum AppActionType {
	FETCH_USER = 'FETCH_USER',
	FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED',
}

export type AppStateType = {
	username: string;
};

export type FetchUserInputActionPayloadType = {
	username: string;
};

export type FetchUserOutputActionPayloadType = {
	avatar_url: string;
};

export interface FetchUserInputAction {
	type: AppActionType;
	payload: FetchUserInputActionPayloadType;
}

export interface FetchUserOutputAction {
	type: AppActionType;
	payload: FetchUserOutputActionPayloadType;
}

export type AppAction$Type = FetchUserInputAction | FetchUserOutputAction;
