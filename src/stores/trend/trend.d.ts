import { ETrendTab } from '@config/constant';
import { ReposItemType } from '@stores/popular/popular';

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

export type TrendUserListType = Array<TrendUserItemType>;

export type ReposListType = Array<ReposItemType>;

export type TrendingListType = Array<TrendingItemType>;

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
};
