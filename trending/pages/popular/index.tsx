import React, { useRef, FC, useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import { FlatList } from 'react-native';

import ReposListItem from 'trending/components/business/ReposListItem';
import CommonFlatList from 'trending/components/business/CommonFlatList';

import { Store } from 'trending/stores';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { EScreenName, RootStackParamList } from 'trending/routes/route.d';
import { ReposItemType } from 'trending/types/repos.d';

import { EFavoriteTab } from 'trending/config/constant';

export type PopularPageStorePropType = Pick<
	Store,
	'popularStore' | 'appStore' | 'favoriteStore'
>;

export type PopularPagePropType = {
	navigation: BottomTabNavigationProp<RootStackParamList, EScreenName.Popular>;
	route: RouteProp<RootStackParamList, EScreenName.Popular>;
	tab: string;
};

const PopularPage: FC<PopularPagePropType & PopularPageStorePropType> = (
	props,
) => {
	const ref = useRef<FlatList<ReposItemType>>();

	const {
		popularStore: { getData, popular, refreshing, hasMore, loadMore, empty },
		tab,
		favoriteStore: { setPopularFavorite, popularFavoriteIds },
		appStore: { theme },
	} = props;

	useEffect(() => {
		getData({ refreshing: true, tab });
	}, []);

	const handleEndReached = () => {
		if (refreshing || empty || !hasMore || loadMore) {
			return;
		}
		getData({ loadMore: true, tab });
	};

	const handleRefresh = () => {
		getData({ refreshing: true, tab });
	};

	const handleFavorite = ({
		item,
		isFavorite,
	}: {
		item: ReposItemType;
		isFavorite: boolean;
	}) => {
		setPopularFavorite({ item, isFavorite });
	};

	return (
		<CommonFlatList
			ref={ref as any}
			theme={theme}
			list={popular[tab]?.items ?? []}
			empty={empty}
			hasMore={hasMore}
			loadMore={loadMore}
			refreshing={refreshing}
			onEndReached={handleEndReached}
			onRefresh={handleRefresh}
			renderItem={({ item }) => {
				return (
					<ReposListItem
						{...(item as ReposItemType)}
						onFavorite={handleFavorite}
						isFavorite={popularFavoriteIds.includes(Number(item.id))}
						source={EFavoriteTab.popular}
						theme={theme}
					/>
				);
			}}
		/>
	);
};

const PopularScreen = (inject((store: Store) => ({
	popularStore: store.popularStore,
	appStore: store.appStore,
	favoriteStore: store.favoriteStore,
}))(observer(PopularPage)) as unknown) as FC<PopularPagePropType>;

export default PopularScreen;
