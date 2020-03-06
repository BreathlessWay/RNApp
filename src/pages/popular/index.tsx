import React, { FC, useEffect } from 'react';

import { FlatList, RefreshControl } from 'react-native';
import { inject, observer } from 'mobx-react';

import PopularListItem from '@components/business/PopularListItem';
import EmptyComponent from '@components/common/EmptyComponent';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { EScreenName, RootStackParamList } from '@routes/route.d';

import { Store } from '@/stores';
import PopularStore from '@stores/popular';

import Style from './style';
import ListFooterComponent from '@components/common/ListFooterComponent';

export type PopularPageStorePropType = {
	popularStore: PopularStore;
};

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

	// const handleEndReached = () => {
	// 	if (empty || !hasMore) {
	// 		return;
	// 	}
	// };

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
			renderItem={({ item }) => <PopularListItem {...item} />}
			ListEmptyComponent={refreshing ? null : <EmptyComponent />}
			// ListFooterComponent={
			// 	empty ? null : (
			// 		<ListFooterComponent hasMore={hasMore} loadMore={loadMore} />
			// 	)
			// }
			// onEndReached={handleEndReached}
		/>
	);
};

const PopularScreen = (inject((store: Store) => ({
	popularStore: store.popularStore,
}))(observer(PopularPage)) as unknown) as FC<PopularPagePropType>;

export default PopularScreen;
