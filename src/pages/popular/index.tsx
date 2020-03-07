import React, { FC, useEffect } from 'react';

import { FlatList, RefreshControl, View, Text } from 'react-native';
import { inject, observer } from 'mobx-react';

import ReposListItem from '@components/business/ReposListItem';
import EmptyComponent from '@components/common/EmptyComponent';
import ListFooterComponent from '@components/common/ListFooterComponent';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { EScreenName, RootStackParamList } from '@routes/route.d';

import { Store } from '@/stores';

export type PopularPageStorePropType = Pick<Store, 'popularStore' | 'appStore'>;

export type PopularPagePropType = {
	navigation: BottomTabNavigationProp<RootStackParamList, EScreenName.Popular>;
	route: RouteProp<RootStackParamList, EScreenName.Popular>;
	tab: string;
};

const PopularPage: FC<PopularPagePropType &
	PopularPageStorePropType> = props => {
	const {
		popularStore: { getData, popular, refreshing, hasMore, loadMore, empty },
		tab,
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
			data={popular[tab]?.items ?? []}
			keyExtractor={item => String(item.id)}
			renderItem={({ item }) => <ReposListItem {...item} />}
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

const PopularScreen = (inject((store: Store) => ({
	popularStore: store.popularStore,
	appStore: store.appStore,
}))(observer(PopularPage)) as unknown) as FC<PopularPagePropType>;

export default PopularScreen;
