import { EFavoriteTab } from 'trending/config/constant';
import { ReposItemType } from 'trending/types/repos.d';
import { TrendingItemType } from 'trending/stores/trend/trend';

export type FavoriteType = {
	[EFavoriteTab.popular]: {
		items: Array<ReposItemType>;
		pageIndex: number;
	};
	[EFavoriteTab.trending]: {
		items: Array<TrendingItemType>;
		pageIndex: number;
	};
};
