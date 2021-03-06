import React, { useRef, FC, useCallback, useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import { useFocusEffect } from '@react-navigation/native';

import { FlatList } from 'react-native';
import ReposListItem from 'trending/components/business/ReposListItem';
import TrendingListItem from 'trending/components/business/TrendingListItem';
import CommonFlatList from 'trending/components/business/CommonFlatList';

import { Store } from 'trending/stores';

import { ReposItemType } from 'trending/types/repos.d';
import { TrendingItemType } from 'trending/stores/trend/trend';

import { EFavoriteTab } from 'trending/config/constant';

export type FavoritePageStorePropType = Pick<
	Store,
	'appStore' | 'favoriteStore'
>;

export type FavoritePagePropType = {
	tab: EFavoriteTab;
};

const FavoritePage: FC<FavoritePagePropType & FavoritePageStorePropType> = (
	props,
) => {
	const ref = useRef<FlatList<ReposItemType>>();

	const {
		favoriteStore: {
			favorite,
			refreshing,
			hasMore,
			loadMore,
			empty,
			getList,
			setPopularFavorite,
			setTrendingFavorite,
		},
		tab,
		appStore: { theme },
	} = props;

	useEffect(() => {
		getList({ refreshing: true, tab });
	}, [tab]);

	useFocusEffect(
		useCallback(() => {
			getList({ refreshing: true, tab });
		}, [tab]),
	);

	const handleEndReached = () => {
		if (refreshing || empty || !hasMore || loadMore) {
			return;
		}
		getList({ loadMore: true, tab });
	};

	const handleRefresh = () => {
		getList({ refreshing: true, tab });
	};

	const handleFavorite = ({
		item,
		isFavorite,
	}: {
		item: ReposItemType | TrendingItemType;
		isFavorite: boolean;
	}) => {
		if (tab === EFavoriteTab.popular) {
			setPopularFavorite({ item: item as ReposItemType, isFavorite });
		}
		if (tab === EFavoriteTab.trending) {
			setTrendingFavorite({ item: item as TrendingItemType, isFavorite });
		}
	};

	return (
		<CommonFlatList
			ref={ref as any}
			theme={theme}
			list={favorite[tab]?.items ?? []}
			empty={empty}
			hasMore={hasMore}
			loadMore={loadMore}
			refreshing={refreshing}
			onEndReached={handleEndReached}
			onRefresh={handleRefresh}
			renderItem={({ item }) =>
				tab === EFavoriteTab.popular ? (
					<ReposListItem
						{...(item as ReposItemType)}
						onFavorite={handleFavorite}
						isFavorite={true}
						source={tab}
						theme={theme}
					/>
				) : (
					<TrendingListItem
						{...(item as any)}
						onFavorite={handleFavorite}
						isFavorite={true}
						theme={theme}
					/>
				)
			}
		/>
	);
};

const FavoriteScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
	favoriteStore: stores.favoriteStore,
}))(observer(FavoritePage)) as unknown) as FC<FavoritePagePropType>;

export default FavoriteScreen;
