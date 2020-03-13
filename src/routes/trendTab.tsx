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

import { ETrendTab, TREND_TABS_LIST } from '@config/constant';

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
		trendStore: { showTabList, initialTrendTab },
	} = props;

	const headerOptions = {
		navigation: stackNavigation,
		title: '趋势',
	};

	useEffect(() => {
		if (!showTabList.length) {
			initialTrendTab(TREND_TABS_LIST);
		}
		setTrendSwitchNavigation(navigation);
	}, []);

	useFocusEffect(
		useCallback(() => {
			setHeader(headerOptions);
		}, [stackNavigation]),
	);

	return showTabList.length ? (
		<Navigator
			initialRouteName={showTabList[0]?.key as any}
			tabBarOptions={{
				scrollEnabled: true,
				style: {
					backgroundColor: theme,
				},
				indicatorStyle: CommonStyle.indicator,
			}}
			lazy={true}>
			{showTabList.map((tab, index) => (
				<Screen
					key={index}
					name={tab.key as any}
					children={props => (
						<TrendScreen {...props} tab={tab.key as ETrendTab} />
					)}
					options={{
						tabBarLabel: () => (
							<Text style={CommonStyle.tabBarLabel}>{tab.title}</Text>
						),
					}}
				/>
			))}
		</Navigator>
	) : null;
};

const TrendTabRouteScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
	trendStore: stores.trendStore,
}))(observer(TrendTabRoutePage)) as unknown) as FC;

export default TrendTabRouteScreen;
