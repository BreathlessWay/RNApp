import { EFavoriteTab } from '@config/constant';
import { ReposItemType } from '@stores/popular/popular';

export type FavoriteType = {
	[EFavoriteTab.popular]: {
		items: Array<ReposItemType>;
		pageIndex: number;
	};
	[EFavoriteTab.trending]: {
		items: Array<ReposItemType>;
		pageIndex: number;
	};
};
