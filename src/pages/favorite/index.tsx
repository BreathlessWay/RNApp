import React, { FC, useCallback } from 'react';
import { inject, observer } from 'mobx-react';

import { useFocusEffect } from '@react-navigation/native';

import { Text } from 'react-native';

import { setHeader } from '@components/business/NavHeader';

import { Store } from '@/stores';

import Style from './style';

export type FavoritePagePropType = Pick<Store, 'appStore'>;

const FavoritePage: FC<FavoritePagePropType> = props => {
	const {
		appStore: { stackNavigation },
	} = props;

	const headerOptions = {
		navigation: stackNavigation,
		title: '收藏',
	};

	useFocusEffect(
		useCallback(() => {
			setHeader(headerOptions);
		}, [stackNavigation]),
	);

	return <Text>FavoritePage</Text>;
};

const FavoriteScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
}))(observer(FavoritePage)) as unknown) as FC;

export default FavoriteScreen;
