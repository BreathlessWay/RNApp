import React, { FC } from 'react';

import ReposListItem from '@components/business/ReposListItem';
import UserListItem from '@components/business/UserListItem';
import TrendingListItem from '@components/business/TrendingListItem';
import KrListItem from '@components/business/KrListItem';

import { ETrendTab } from '@config/constant';

export type TrendListItemPropType = {
	tab: ETrendTab;
	item: any;
	onFavorite: (params: { item: any; isFavorite: boolean }) => void;
	trendingFavoriteIds: Array<string>;
	theme: string;
};

const TrendListItem: FC<TrendListItemPropType> = props => {
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
