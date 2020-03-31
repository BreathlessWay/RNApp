import React, { FC } from 'react';

import ReposListItem from 'trending/components/business/ReposListItem';
import UserListItem from 'trending/components/business/UserListItem';
import TrendingListItem from 'trending/components/business/TrendingListItem';
import KrListItem from 'trending/components/business/KrListItem';

import { ETrendTab } from 'trending/config/constant';

export type TrendListItemPropType = {
	tab: ETrendTab;
	item: any;
	onFavorite: (params: { item: any; isFavorite: boolean }) => void;
	trendingFavoriteIds: Array<string>;
	theme: string;
};

const TrendListItem: FC<TrendListItemPropType> = (props) => {
	const { tab, item, onFavorite, trendingFavoriteIds, theme } = props;
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
					theme={theme}
					onFavorite={onFavorite}
					isFavorite={trendingFavoriteIds.includes(item.full_name)}
				/>
			);
		case ETrendTab.kr:
			return <KrListItem {...item} />;
		default:
			return null;
	}
};

export default TrendListItem;
