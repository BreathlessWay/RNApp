import React, { FC, useCallback, useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Text } from 'react-native';

import PopularScreen from '@pages/popular';

import { setHeader } from '@components/business/NavHeader';

import { Store } from '@/stores';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '@routes/route.d';

import { POPULAR_TABS_LIST } from '@config/constant';

import CommonStyle from '@styles/common';

const { Navigator, Screen } = createMaterialTopTabNavigator<
	RootStackParamList
>();

export type PopularTabRoutePagePropType = Pick<Store, 'appStore'>;

const PopularTabRoutePage: FC<PopularTabRoutePagePropType> = props => {
	const navigation = useNavigation<
		BottomTabNavigationProp<RootStackParamList>
	>();

	const { stackNavigation, setPopularSwitchNavigation, theme } = props.appStore;

	const headerOptions = {
		navigation: stackNavigation,
		title: '最热',
	};

	useEffect(() => {
		setPopularSwitchNavigation(navigation);
	}, []);

	useFocusEffect(
		useCallback(() => {
			setHeader(headerOptions);
		}, [stackNavigation]),
	);

	return (
		<Navigator
			initialRouteName={POPULAR_TABS_LIST[0].title as any}
			tabBarOptions={{
				scrollEnabled: true,
				style: {
					backgroundColor: theme,
				},
				indicatorStyle: CommonStyle.indicator,
			}}
			lazy={true}>
			{POPULAR_TABS_LIST.map((tab, index) => (
				<Screen
					key={index}
					name={tab.title as any}
					children={props => <PopularScreen {...props} tab={tab.query} />}
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

const PopularTabRouteScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
}))(observer(PopularTabRoutePage)) as unknown) as FC;

export default PopularTabRouteScreen;
