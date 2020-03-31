import { ETrendTab } from 'trending/config/constant';
import { ReposItemType } from 'trending/types/repos.d';

export type TrendingItemType = {
	full_name: string;
	language: string;
	color: string;
	description: string;
	forked: string;
	stargazers_count: number;
	todayStar: string;
	html_url: string;
	rank: number;
};

export type TrendUserItemType = {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	site_admin: boolean;
	score: number;
	rank: number;
	name: string;
	company: string;
	blog: string;
	location: string;
	email: null;
	hireable: null;
	bio: null;
	public_repos: number;
	public_gists: number;
	followers: number;
	following: number;
	created_at: string;
	updated_at: string;
};

export type KrListItemType = {
	id: number;
	project_id: number;
	column_id: number;
	post_id: null;
	is_top: number;
	pin: number;
	title: string;
	catch_title: string;
	description: string;
	cover: string;
	news_url_type: string;
	news_url: string;
	user_id: number;
	published_at: string;
	created_at: string;
	updated_at: string;
	counters: {
		view_count: number;
		pv: number;
		pv_mobile: number;
		pv_app: number;
		comment: number;
	};
	extraction_tags_arr: [];
	extraction_tags: '[]';
	column: {
		id: number;
		name: string;
		bg_color: string;
		type: string;
	};
	db_counters: [];
	user: {
		id: number;
		name: string;
		avatar_url: string;
	};
	news_url_title: string;
	station_info: null;
};

export type TrendUserListType = Array<TrendUserItemType>;

export type ReposListType = Array<ReposItemType>;

export type TrendingListType = Array<TrendingItemType>;

export type KrListListType = Array<KrListItemType>;

export type TrendingType = {
	[ETrendTab.allUser]: {
		pageIndex: number;
		list: TrendUserListType;
	};
	[ETrendTab.chinaUser]: {
		pageIndex: number;
		list: TrendUserListType;
	};
	[ETrendTab.repos]: {
		pageIndex: number;
		list: ReposListType;
	};
	[ETrendTab.trendingDaily]: {
		pageIndex: number;
		list: TrendingListType;
	};
	[ETrendTab.trendingWeekly]: {
		pageIndex: number;
		list: TrendingListType;
	};
	[ETrendTab.trendingMonthly]: {
		pageIndex: number;
		list: TrendingListType;
	};
	[ETrendTab.trending]: {
		pageIndex: number;
		list: TrendingListType;
	};
	[ETrendTab.kr]: {
		pageIndex: number;
		list: KrListListType;
	};
};
