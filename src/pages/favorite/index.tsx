import React, { FC, useCallback, useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import { useFocusEffect } from '@react-navigation/native';

import { FlatList, RefreshControl } from 'react-native';

import ListFooterComponent from '@components/common/ListFooterComponent';
import ReposListItem from '@components/business/ReposListItem';
import EmptyComponent from '@components/common/EmptyComponent';

import { Store } from '@/stores';

import { ReposItemType } from '@stores/popular/popular';

import { EFavoriteTab } from '@config/constant';

export type FavoritePageStorePropType = Pick<Store, 'favoriteStore'>;

export type FavoritePagePropType = {
	tab: EFavoriteTab;
};

const FavoritePage: FC<FavoritePagePropType &
	FavoritePageStorePropType> = props => {
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
		if (empty || !hasMore || loadMore) {
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
		item: ReposItemType;
		isFavorite: boolean;
	}) => {
		if (tab === EFavoriteTab.popular) {
			setPopularFavorite({ item, isFavorite });
		}
		if (tab === EFavoriteTab.trending) {
			setTrendingFavorite({ item, isFavorite });
		}
	};

	return (
		<FlatList
			refreshControl={
				<RefreshControl
					// iOS
					title="Loading..."
					titleColor="green"
					tintColor="green"
					// Android
					colors={['green']}
					onRefresh={handleRefresh}
					refreshing={refreshing}
				/>
			}
			data={favorite[tab]?.items ?? []}
			keyExtractor={item => String(item.id)}
			renderItem={({ item }) => (
				<ReposListItem
					{...item}
					onFavorite={handleFavorite}
					isFavorite={true}
					source={tab}
				/>
			)}
			ListEmptyComponent={refreshing ? null : <EmptyComponent />}
			ListFooterComponent={
				empty ? null : (
					<ListFooterComponent hasMore={hasMore} loadMore={loadMore} />
				)
			}
			onEndReached={handleEndReached}
			onEndReachedThreshold={0.5}
		/>
	);
};

const FavoriteScreen = (inject((stores: Store) => ({
	favoriteStore: stores.favoriteStore,
}))(observer(FavoritePage)) as unknown) as FC<FavoritePagePropType>;

export default FavoriteScreen;
