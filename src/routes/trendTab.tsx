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

import { HEADER_THEME_COLOR, TREND_TABS_LIST } from '@config/constant';

const { Navigator, Screen } = createMaterialTopTabNavigator<
	RootStackParamList
>();

export type PopularTabRoutePagePropType = Pick<Store, 'appStore'>;

const TrendTabRoutePage: FC<PopularTabRoutePagePropType> = props => {
	const navigation = useNavigation<
		BottomTabNavigationProp<RootStackParamList>
	>();

	const { stackNavigation, setTrendSwitchNavigation } = props.appStore;

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
			initialRouteName={TREND_TABS_LIST[0].key as any}
			tabBarOptions={{
				scrollEnabled: true,
				style: {
					backgroundColor: HEADER_THEME_COLOR,
				},
				indicatorStyle: {
					height: 2,
					backgroundColor: '#fff',
				},
			}}
			lazy={true}>
			{TREND_TABS_LIST.map((tab, index) => (
				<Screen
					key={index}
					name={tab.key as any}
					children={props => <TrendScreen {...props} tab={tab.key} />}
					options={{
						tabBarLabel: () => (
							<Text
								style={{
									fontSize: 13,
									marginHorizontal: 6,
									color: '#fff',
								}}>
								{tab.title}
							</Text>
						),
					}}
				/>
			))}
		</Navigator>
	);
};

const TrendTabRouteScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
}))(observer(TrendTabRoutePage)) as unknown) as FC;

export default TrendTabRouteScreen;
