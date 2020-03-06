import React, { FC, useEffect } from 'react';

import { FlatList } from 'react-native';
import { inject, observer } from 'mobx-react';

import PopularListItem from '@components/business/PopularListItem';
import EmptyComponent from '@components/common/EmptyComponent';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { EScreenName, RootStackParamList } from '@routes/route.d';

import { Store } from '@/stores';
import PopularStore from '@stores/popular';

import Style from './style';

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
		popularStore: { getData, popular },
		tab,
	} = props;

	useEffect(() => {
		getData({ refreshing: true, tab });
	}, []);

	return (
		<FlatList
			data={popular[tab]?.items ?? []}
			keyExtractor={item => String(item.id)}
			renderItem={({ item }) => <PopularListItem {...item} />}
			ListEmptyComponent={<EmptyComponent />}
		/>
	);
};

const PopularScreen = (inject((store: Store) => ({
	popularStore: store.popularStore,
}))(observer(PopularPage)) as unknown) as FC<PopularPagePropType>;

export default PopularScreen;
