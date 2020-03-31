import { ReposItemType } from 'trending/types/repos.d';

export type PopularListType = {
	total_count: number;
	incomplete_results: boolean;
	items: Array<ReposItemType>;
	pageIndex: number;
	refreshing: boolean;
	loadMore: boolean;
};

export type PopularType = {
	[key: string]: PopularListType;
};
