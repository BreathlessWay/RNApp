import React, { FC, useCallback } from 'react';

import {
	useNavigation,
	useRoute,
	useFocusEffect,
} from '@react-navigation/native';

import { View, Text } from 'react-native';
import { inject, observer } from 'mobx-react';

import { setHeader } from '@components/business/NavHeader';

import { Store } from '@/stores';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { EScreenName, RootStackParamList } from '@routes/route.d';

import Style from './style';

export type TrendPagePropType = Pick<Store, 'appStore'>;

const TrendPage: FC<TrendPagePropType> = props => {
	const navigation = useNavigation<
		BottomTabNavigationProp<RootStackParamList, EScreenName.Trend>
	>();
	const route = useRoute<RouteProp<RootStackParamList, EScreenName.Trend>>();

	const {
		appStore: { stackNavigation },
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

	const handlePress = () => {
		props.appStore.setTheme('#000');
	};

	return (
		<View>
			<Text onPress={handlePress}>修改主题色</Text>
		</View>
	);
};

const TrendScreen = (inject((store: Store) => ({
	appStore: store.appStore,
}))(observer(TrendPage)) as unknown) as FC;

export default TrendScreen;
