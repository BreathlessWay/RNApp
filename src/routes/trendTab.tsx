import React, { FC, useCallback, useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Text } from 'react-native';

import TrendScreen from '@pages/trend';

import { setHeader } from '@components/business/NavHeader';

import { Store } from '@/stores';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '@routes/route.d';

import { TREND_TABS_LIST } from '@config/constant';

import CommonStyle from '@styles/common';

const { Navigator, Screen } = createMaterialTopTabNavigator<
	RootStackParamList
>();

export type TrendTabRoutePagePropType = Pick<Store, 'appStore' | 'trendStore'>;

const TrendTabRoutePage: FC<TrendTabRoutePagePropType> = props => {
	const navigation = useNavigation<
		BottomTabNavigationProp<RootStackParamList>
	>();

	const {
		appStore: { stackNavigation, setTrendSwitchNavigation, theme },
	} = props;

	const headerOptions = {
		navigation: stackNavigation,
		title: '趋势',
	};

	useEffect(() => {
		setTrendSwitchNavigation(navigation);
	}, []);

	useFocusEffect(
		useCallback(() => {
			setHeader(headerOptions);
		}, [stackNavigation]),
	);

	return (
		<Navigator
			initialRouteName={TREND_TABS_LIST[0]?.key as any}
			tabBarOptions={{
				scrollEnabled: true,
				style: {
					backgroundColor: theme,
				},
				indicatorStyle: CommonStyle.indicator,
			}}
			lazy={true}>
			{TREND_TABS_LIST.map((tab, index) => (
				<Screen
					key={index}
					name={tab.key as any}
					children={props => <TrendScreen {...props} tab={tab.key} />}
					options={{
						tabBarLabel: () => (
							<Text style={CommonStyle.tabBarLabel}>{tab.title}</Text>
						),
					}}
				/>
			))}
		</Navigator>
	);
};

const TrendTabRouteScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
	trendStore: stores.trendStore,
}))(observer(TrendTabRoutePage)) as unknown) as FC;

export default TrendTabRouteScreen;
