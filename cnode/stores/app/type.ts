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
