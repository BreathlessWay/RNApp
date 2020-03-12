import React, { useRef, FC, useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import { FlatList } from 'react-native';

import ReposListItem from '@components/business/ReposListItem';
import CommonFlatList from '@components/business/CommonFlatList';

import { Store } from '@/stores';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { EScreenName, RootStackParamList } from '@routes/route.d';
import { ReposItemType } from '@stores/popular/popular';

import { EFavoriteTab } from '@config/constant';

export type PopularPageStorePropType = Pick<
	Store,
	'popularStore' | 'appStore' | 'favoriteStore'
>;

export type PopularPagePropType = {
	navigation: BottomTabNavigationProp<RootStackParamList, EScreenName.Popular>;
	route: RouteProp<RootStackParamList, EScreenName.Popular>;
	tab: string;
};

const PopularPage: FC<PopularPagePropType &
	PopularPageStorePropType> = props => {
	const ref = useRef<FlatList<ReposItemType>>();

	const {
		popularStore: { getData, popular, refreshing, hasMore, loadMore, empty },
		tab,
		favoriteStore: { setPopularFavorite, popularFavoriteIds },
	} = props;

	useEffect(() => {
		getData({ refreshing: true, tab });
	}, []);

	const handleEndReached = () => {
		if (empty || !hasMore || loadMore) {
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
		setPopularFavorite({ item: itemWrap, isFavorite });
	};

	return (
		<CommonFlatList
			ref={ref as any}
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
