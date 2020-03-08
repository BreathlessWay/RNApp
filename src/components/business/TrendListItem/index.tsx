import React, { FC } from 'react';

import ReposListItem from '@components/business/ReposListItem';
import UserListItem from '@components/business/UserListItem';
import TrendingListItem from '@components/business/TrendingListItem';

import { ReposItemType } from '@stores/popular/popular';

import { EFavoriteTab, ETrendTab } from '@config/constant';

export type TrendListItemPropType = {
	tab: ETrendTab;
	item: any;
	onFavorite: (params: { item: ReposItemType; isFavorite: boolean }) => void;
	trendingFavoriteIds: Array<number>;
};

const TrendListItem: FC<TrendListItemPropType> = props => {
	const { tab, item, onFavorite, trendingFavoriteIds } = props;
	switch (tab) {
		case ETrendTab.allUser:
		case ETrendTab.chinaUser:
			return <UserListItem {...item} />;
		case ETrendTab.repos:
			return (
				<ReposListItem
					{...item}
					onFavorite={onFavorite}
					isFavorite={trendingFavoriteIds.includes(item.id)}
					source={EFavoriteTab.trending}
				/>
			);
		case ETrendTab.trending:
			return <TrendingListItem {...item} />;
		default:
			return null;
	}
};

export default TrendListItem;
