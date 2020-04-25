export type FetchUserActionPayloadType = {
	username: string;
};

export type FetchUserCancelActionPayloadType = {
	token: string;
};

export type FetchUserFulfilledActionPayloadType = {
	avatar_url: string;
};

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
