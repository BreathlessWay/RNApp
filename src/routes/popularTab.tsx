import React, { FC } from 'react';

import PopularScreen from '@pages/popular';
import DetailScreen from '@pages/detail';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeArea } from 'react-native-safe-area-context';

import { EScreenName, RootStackParamList } from '@routes/route.d';

const { Navigator, Screen } = createMaterialTopTabNavigator<
	RootStackParamList
>();

const PopularTabRoutePage = () => {
	const insets = useSafeArea();

	return (
		<Navigator
			initialRouteName={EScreenName.PopularIndex}
			style={{
				paddingTop: insets.top,
			}}>
			<Screen
				name={EScreenName.PopularIndex}
				component={PopularScreen}
				options={{
					tabBarLabel: '1',
				}}
			/>
			<Screen
				name={EScreenName.PopularDetail}
				component={DetailScreen}
				options={{
					tabBarLabel: '2',
				}}
			/>
		</Navigator>
	);
};

const PopularTabRouteScreen = (PopularTabRoutePage as unknown) as FC;

export default PopularTabRouteScreen;
