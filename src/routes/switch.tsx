import React, { FC, useEffect } from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
	useNavigation,
	CompositeNavigationProp,
} from '@react-navigation/native';

import HotScreen from '@pages/hot';
import TrendScreen from '@pages/trend';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { EScreenName, RootStackParamList } from './route.d';
import { StackNavigationProp } from '@react-navigation/stack';

// 当使用导航时自带了SafeAreaView
const { Navigator, Screen } = createMaterialBottomTabNavigator<
	RootStackParamList
>();

const SwitchRoutePage = () => {
	const navigation = useNavigation<
		BottomTabNavigationProp<RootStackParamList, EScreenName.Welcome>
	>();

	useEffect(() => {
		const unsubscribe = navigation.addListener('tabPress', e => {
			console.log(1);
			e.preventDefault();
		});

		return unsubscribe;
	}, [navigation]);

	return (
		<Navigator initialRouteName={EScreenName.Hot}>
			<Screen
				name={EScreenName.Hot}
				component={HotScreen}
				options={{
					title: '热门',
				}}
			/>
			<Screen
				name={EScreenName.Trend}
				component={TrendScreen}
				options={{
					title: '趋势',
				}}
			/>
		</Navigator>
	);
};

const SwitchRouteScreen = (SwitchRoutePage as unknown) as FC;

export default SwitchRouteScreen;
