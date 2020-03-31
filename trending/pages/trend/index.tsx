import React, { FC, useEffect, useRef } from 'react';
import { inject, observer } from 'mobx-react';

import { View, FlatList } from 'react-native';

import TrendListItem from 'trending/components/business/TrendListItem';
import PopupComponent from 'trending/components/common/PopupComponent';
import CommonFlatList from 'trending/components/business/CommonFlatList';

import { Store } from 'trending/stores';

import { ETrendTab } from 'trending/config/constant';
import { ReposItemType } from 'trending/types/repos.d';
import { TrendingItemType } from 'trending/stores/trend/trend';

export type TrendPageStorePropType = Pick<
	Store,
	'appStore' | 'trendStore' | 'favoriteStore'
>;

export type TrendPagePropType = {
	tab: ETrendTab;
};

const TrendPage: FC<TrendPagePropType & TrendPageStorePropType> = (props) => {
	const ref = useRef<FlatList<ReposItemType>>();

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
		appStore: { theme },
	} = props;

	useEffect(() => {
		getList({ refreshing: true, tab });
	}, [tab]);

	const handleEndReached = () => {
		if (refreshing || empty || !hasMore || loadMore) {
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
		item: TrendingItemType;
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
			<CommonFlatList
				ref={ref as any}
				theme={theme}
				list={data}
				empty={empty}
				hasMore={hasMore}
				loadMore={loadMore}
				refreshing={refreshing}
				onEndReached={handleEndReached}
				onRefresh={handleRefresh}
				renderItem={({ item }: { item: any }) => (
					<TrendListItem
						tab={tab}
						item={item}
						theme={theme}
						onFavorite={handleFavorite}
						trendingFavoriteIds={trendingFavoriteIds}
					/>
				)}
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
