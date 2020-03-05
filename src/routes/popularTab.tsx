import React, { FC } from 'react';

import PopularScreen from '@pages/popular';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeArea } from 'react-native-safe-area-context';

import { RootStackParamList } from '@routes/route.d';
import { Text } from 'react-native';

const { Navigator, Screen } = createMaterialTopTabNavigator<
	RootStackParamList
>();

const tabs = [
	'JavaScript',
	'Typescript',
	'Node',
	'Vue',
	'React',
	'React Native',
];

const PopularTabRoutePage = () => {
	const insets = useSafeArea();

	return (
		<Navigator
			tabBarOptions={{
				scrollEnabled: true,
			}}
			style={{
				paddingTop: insets.top,
			}}>
			{tabs.map((tab, index) => (
				<Screen
					key={index}
					name={tab as any}
					component={PopularScreen}
					options={{
						tabBarLabel: () => <Text>{tab}</Text>,
					}}
				/>
			))}
		</Navigator>
	);
};

const PopularTabRouteScreen = (PopularTabRoutePage as unknown) as FC;

export default PopularTabRouteScreen;
