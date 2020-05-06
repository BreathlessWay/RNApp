import { ETopicsTab } from 'cnode/config/constant';

export type TopicsItemType = {
	id: string;
	author_id: string;
	tab: string;
	content: string;
	title: string;
	last_reply_at: string;
	good: boolean;
	top: boolean;
	reply_count: number;
	visit_count: number;
	create_at: string;
	author: {
		loginname: string;
		avatar_url: string;
	};
};

export type TopicListItemType = {
	limit: number;
	page: number;
	loading: boolean;
	refreshing: boolean;
	error: string;
	hasMore: boolean;
	empty: boolean;
	list: Array<TopicsItemType>;
};

export type TopicsStateType = {
	[key in ETopicsTab]: TopicListItemType;
};

export type GetTopicsResponseType = {
	success: boolean;
	data: Array<TopicsItemType>;
};

export type GetTopicsActionPayloadType = {
	tab: ETopicsTab;
	refreshing?: boolean;
};

export type GetTopicsSuccessActionPayloadType = {
	[key: string]: TopicListItemType;
};

export type GetTopicsFailedActionPayloadType = {
	[key: string]: TopicListItemType;
};

export type GetTopicsCanceledActionPayloadType = {
	[key: string]: TopicListItemType;
};

export type TopicReplyItemType = {
	id: string;
	author: {
		loginname: string;
		avatar_url: string;
	};
	content: string;
	ups: Array<string>;
	create_at: string;
	reply_id: string | null;
	is_uped: boolean;
};

export type TopicDetailType = {
	id: string;
	author_id: string;
	tab: ETopicsTab;
	content: string;
	title: string;
	last_reply_at: string;
	good: boolean;
	top: boolean;
	reply_count: number;
	visit_count: number;
	create_at: string;
	author: {
		loginname: string;
		avatar_url: string;
	};
	replies: Array<TopicReplyItemType>;
	is_collect: boolean;
};
