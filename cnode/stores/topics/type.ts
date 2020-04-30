import { ETopicsTag } from 'cnode/config/constant';

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

export type TopicsStateType = {
	[ETopicsTag.All]: {
		loading: boolean;
		hasMore: boolean;
		refreshing: boolean;
		page: number;
		limit: number;
		error: string;
		list: Array<TopicsItemType>;
	};
	[ETopicsTag.Ask]: {
		loading: boolean;
		hasMore: boolean;
		refreshing: boolean;
		page: number;
		limit: number;
		error: string;
		list: Array<TopicsItemType>;
	};
	[ETopicsTag.Share]: {
		loading: boolean;
		hasMore: boolean;
		refreshing: boolean;
		page: number;
		limit: number;
		error: string;
		list: Array<TopicsItemType>;
	};
	[ETopicsTag.Job]: {
		loading: boolean;
		hasMore: boolean;
		refreshing: boolean;
		page: number;
		limit: number;
		error: string;
		list: Array<TopicsItemType>;
	};
	[ETopicsTag.Good]: {
		loading: boolean;
		hasMore: boolean;
		refreshing: boolean;
		page: number;
		limit: number;
		error: string;
		list: Array<TopicsItemType>;
	};
};

export type GetTopicsResponseType = {
	success: boolean;
	data: Array<TopicsItemType>;
};

export type GetTopicsActionPayloadType = {
	tag: ETopicsTag;
	refreshing: boolean;
};

export type GetTopicsSuccessActionPayloadType = {
	tag: ETopicsTag;
	data: GetTopicsResponseType['data'];
};

export type GetTopicsFailedActionPayloadType = {
	tag: ETopicsTag;
	error: string;
};

export type GetTopicsCanceledActionPayloadType = {
	tag: ETopicsTag;
};
