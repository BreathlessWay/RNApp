import { EFavoriteTab } from '@config/constant';
import { ReposItemType } from '@stores/popular/popular';
import { TrendingItemType } from '@stores/trend/trend';

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
