export type UserStateType = {
	isLogin: boolean;
	loading: boolean;
	error: string;
	accesstoken: string;
	id: string;
	count: number;
	userInfo: {
		avatar_url: string;
		loginname: string;
		githubUsername: string;
		create_at: string;
		score: number;
		recent_topics: Array<any>;
		recent_replies: Array<any>;
	} | null;
};

export type LoginActionPayloadType = {
	accesstoken: string;
};

export type LoginResponseType = {
	avatar_url: string;
	id: string;
	loginname: string;
	success: boolean;
};

export type GetMessageCountActionPayloadType = {
	accesstoken: string;
};

export type GetMessageCountSuccessActionPayloadType = GetMessageCountResponseType;

export type GetMessageCountFailedActionPayloadType = {
	error: string;
};

export type GetMessageCountResponseType = {
	success: boolean;
	data: number;
};

export type FetchUserActionPayloadType = LoginResponseType;

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
