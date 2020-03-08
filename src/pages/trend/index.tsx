import React, { FC, useEffect, useRef } from 'react';
import { inject, observer } from 'mobx-react';

import { View, FlatList, RefreshControl } from 'react-native';

import EmptyComponent from '@components/common/EmptyComponent';
import ListFooterComponent from '@components/common/ListFooterComponent';
import TrendListItem from '@components/business/TrendListItem';
import PopupComponent from '@components/common/PopupComponent';

import { Store } from '@/stores';

import { ETrendTab } from '@config/constant';
import { ReposItemType } from '@stores/popular/popular';

export type TrendPageStorePropType = Pick<
	Store,
	'appStore' | 'trendStore' | 'favoriteStore'
>;

export type TrendPagePropType = {
	tab: ETrendTab;
};

const TrendPage: FC<TrendPagePropType & TrendPageStorePropType> = props => {
	const ref = useRef<FlatList<any>>();

	const {
		tab,
		trendStore: {
			getList,
			trending,
			empty,
			hasMore,
			loadMore,
			refreshing,
			trendFilterTab,
			setFilter,
			filter,
		},
		favoriteStore: { setTrendingFavorite, trendingFavoriteIds },
	} = props;

	useEffect(() => {
		getList({ refreshing: true, tab });
	}, [tab]);

	const handleEndReached = () => {
		if (empty || !hasMore || loadMore) {
			return;
		}
		getList({ loadMore: true, tab });
	};

	const handleRefresh = () => {
		getList({ refreshing: true, tab });
	};

	const handleSelect = (key: string) => {
		ref.current && ref.current.scrollToOffset({ offset: 0 });
		setFilter(key as ETrendTab);
		getList({ refreshing: true, tab });
	};

	const handleFavorite = ({
		item,
		isFavorite,
	}: {
		item: ReposItemType;
		isFavorite: boolean;
	}) => {
		setTrendingFavorite({ item, isFavorite });
	};

	let data: any = trending[tab]?.list ?? [];

	if (tab === ETrendTab.trending) {
		data = trending[filter]?.list ?? [];
	}

	return (
		<View>
			{tab === ETrendTab.trending ? (
				<PopupComponent list={trendFilterTab} onSelect={handleSelect} />
			) : null}
			<FlatList
				ref={ref as any}
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
				data={data}
				keyExtractor={(item: any) => String(item.id) || String(item.rank)}
				renderItem={({ item }) => (
					<TrendListItem
						tab={tab}
						item={item}
						onFavorite={handleFavorite}
						trendingFavoriteIds={trendingFavoriteIds}
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
		</View>
	);
};

const TrendScreen = (inject((store: Store) => ({
	appStore: store.appStore,
	trendStore: store.trendStore,
	favoriteStore: store.favoriteStore,
}))(observer(TrendPage)) as unknown) as FC<TrendPagePropType>;

export default TrendScreen;
