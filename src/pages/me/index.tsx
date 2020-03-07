import React, { FC, useCallback } from 'react';
import { inject, observer } from 'mobx-react';

import { useFocusEffect } from '@react-navigation/native';

import { Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { setHeader, setHeaderParams } from '@components/business/NavHeader';

import { Store } from '@/stores';

import Style from './style';

export type MePagePropType = Pick<Store, 'appStore'>;

const MePage: FC<MePagePropType> = props => {
	const {
		appStore: { stackNavigation },
	} = props;

	const handlePressRight = () => {};

	const headerOptions: setHeaderParams = {
		navigation: stackNavigation,
		title: '我的',
		right: <Feather name="search" size={22} color="#fff" />,
		onPressRight: handlePressRight,
	};

	useFocusEffect(
		useCallback(() => {
			setHeader(headerOptions);
		}, [stackNavigation]),
	);

	return <Text>MePage</Text>;
};

const MeScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
}))(observer(MePage)) as unknown) as FC;

export default MeScreen;
