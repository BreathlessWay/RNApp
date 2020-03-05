import React, { FC } from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import HotScreen from '@pages/hot';
import TrendScreen from '@pages/trend';
import PopularScreen from '@pages/popular';
import FavoriteScreen from '@pages/favorite';
import MeScreen from '@pages/me';

import { EScreenName, RootStackParamList } from './route.d';

// 当使用导航时自带了SafeAreaView
const { Navigator, Screen } = createMaterialBottomTabNavigator<
	RootStackParamList
>();

const SwitchRoutePage = () => {
	return (
		<Navigator initialRouteName={EScreenName.Popular}>
			<Screen
				name={EScreenName.Popular}
				component={PopularScreen}
				options={{
					title: '流行',
				}}
			/>
			<Screen
				name={EScreenName.Trend}
				component={TrendScreen}
				options={{
					title: '趋势',
				}}
			/>
			<Screen
				name={EScreenName.Favorite}
				component={FavoriteScreen}
				options={{
					title: '关注',
				}}
			/>
			<Screen
				name={EScreenName.Me}
				component={MeScreen}
				options={{
					title: '我',
				}}
			/>
		</Navigator>
	);
};

const SwitchRouteScreen = (SwitchRoutePage as unknown) as FC;

export default SwitchRouteScreen;
