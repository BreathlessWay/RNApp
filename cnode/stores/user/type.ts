export type LoginActionPayloadType = {
	accesstoken: string;
};

export type LoginSuccessActionPayloadType = LoginResponseType;

export type LoginFailedActionPayloadType = {
	error: string;
};

export type LoginResponseType = {
	avatar_url: string;
	id: string;
	loginname: string;
	success: boolean;
};

export type FetchUserActionPayloadType = {
	username: string;
};

export type FetchUserCancelActionPayloadType = {};

export type FetchUserFulfilledActionPayloadType = UserResponseType['data'];

export type FetchUserRejectedActionPayloadType = {
	error: string;
};

export type UserResponseType = {
	success: boolean;
	data: {
		loginname: string;
		avatar_url: string;
		githubUsername: string;
		create_at: string;
		score: number;
		recent_topics: Array<any>;
		recent_replies: Array<{
			id: string;
			author: {
				loginname: string;
				avatar_url: string;
			};
			title: string;
			last_reply_at: string;
		}>;
	};
};
