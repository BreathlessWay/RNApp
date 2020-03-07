import React, { FC, useCallback, useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import { useFocusEffect } from '@react-navigation/native';

import { FlatList, RefreshControl } from 'react-native';

import EmptyComponent from '@components/common/EmptyComponent';
import ListFooterComponent from '@components/common/ListFooterComponent';
import TrendListItem from '@components/business/TrendListItem';

import { setHeader } from '@components/business/NavHeader';

import { Store } from '@/stores';

import { ETrendTab } from '@config/constant';

import Style from './style';

export type TrendPageStorePropType = Pick<Store, 'appStore' | 'trendStore'>;

export type TrendPagePropType = {
	tab: ETrendTab;
};

const TrendPage: FC<TrendPagePropType & TrendPageStorePropType> = props => {
	const {
		tab,
		appStore: { stackNavigation },
		trendStore: { getList, trending, empty, hasMore, loadMore, refreshing },
	} = props;

	const headerOptions = {
		navigation: stackNavigation,
		title: '趋势',
	};

	useFocusEffect(
		useCallback(() => {
			setHeader(headerOptions);
		}, [stackNavigation]),
	);

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
			data={(trending[tab]?.list ?? []) as any}
			keyExtractor={(item: any) => String(item.id) || String(item.rank)}
			renderItem={({ item }) => <TrendListItem tab={tab} item={item} />}
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

const TrendScreen = (inject((store: Store) => ({
	appStore: store.appStore,
	trendStore: store.trendStore,
}))(observer(TrendPage)) as unknown) as FC<TrendPagePropType>;

export default TrendScreen;
