export type FetchUserActionPayloadType = {
	username: string;
};

export type FetchUserFulfilledActionPayloadType = {
	avatar_url: string;
};

export type FetchUserRejectedActionPayloadType = {
	error: string;
};
