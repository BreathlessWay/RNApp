import React, { FC, useCallback, useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import PopularScreen from 'trending/pages/popular';

import { setHeader } from 'trending/components/business/NavHeader';

import { Store } from 'trending/stores';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { EScreenName, RootStackParamList } from 'trending/routes/route.d';

import { POPULAR_TABS_LIST } from 'trending/config/constant';

import CommonStyle from 'trending/styles/common';

const { Navigator, Screen } = createMaterialTopTabNavigator<
	RootStackParamList
>();

export type PopularTabRoutePagePropType = Pick<
	Store,
	'appStore' | 'popularStore'
>;

const PopularTabRoutePage: FC<PopularTabRoutePagePropType> = (props) => {
	const navigation = useNavigation<
		BottomTabNavigationProp<RootStackParamList>
	>();

	const {
		appStore: { stackNavigation, setPopularSwitchNavigation, theme },
		popularStore: { initialPopularTab, showTabList },
	} = props;

	const handlePressRight = () => {
		navigation.navigate(EScreenName.Search);
	};

	const headerOptions = {
		navigation: stackNavigation,
		title: '最热',
		right: <Feather name="search" size={22} color="#fff" />,
		onPressRight: handlePressRight,
	};

	useEffect(() => {
		if (!showTabList.length) {
			initialPopularTab(POPULAR_TABS_LIST);
		}
		setPopularSwitchNavigation(navigation);
	}, []);

	useFocusEffect(
		useCallback(() => {
			setHeader(headerOptions);
		}, [stackNavigation]),
	);

	return showTabList.length ? (
		<Navigator
			initialRouteName={showTabList[0].title as any}
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
					name={tab.title as any}
					children={(props) => <PopularScreen {...props} tab={tab.key} />}
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

const PopularTabRouteScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
	popularStore: stores.popularStore,
}))(observer(PopularTabRoutePage)) as unknown) as FC;

export default PopularTabRouteScreen;
