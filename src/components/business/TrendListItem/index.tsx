import React, { FC } from 'react';

import ReposListItem from '@components/business/ReposListItem';
import UserListItem from '@components/business/UserListItem';
import TrendingListItem from '@components/business/TrendingListItem';

import { ETrendTab } from '@config/constant';

export type TrendListItemPropType = {
	tab: ETrendTab;
	item: any;
	onFavorite: (params: { item: any; isFavorite: boolean }) => void;
	trendingFavoriteIds: Array<string>;
};

const TrendListItem: FC<TrendListItemPropType> = props => {
	const { tab, item, onFavorite, trendingFavoriteIds } = props;
	switch (tab) {
		case ETrendTab.allUser:
		case ETrendTab.chinaUser:
			return <UserListItem {...item} />;
		case ETrendTab.repos:
			return <ReposListItem {...item} />;
		case ETrendTab.trending:
			return (
				<TrendingListItem
					{...item}
					onFavorite={onFavorite}
					isFavorite={trendingFavoriteIds.includes(item.full_name)}
				/>
			);
		default:
			return null;
	}
};

export default TrendListItem;
