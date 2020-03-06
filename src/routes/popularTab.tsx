import React, { FC } from 'react';

import { Text } from 'react-native';

import PopularScreen from '@pages/popular';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeArea } from 'react-native-safe-area-context';

import { RootStackParamList } from '@routes/route.d';

import { TABS_LIST } from '@config/constant';

const { Navigator, Screen } = createMaterialTopTabNavigator<
	RootStackParamList
>();

const PopularTabRoutePage = () => {
	const insets = useSafeArea();

	return (
		<Navigator
			initialRouteName={TABS_LIST[0] as any}
			tabBarOptions={{
				scrollEnabled: true,
				style: {
					backgroundColor: '#678',
				},
				indicatorStyle: {
					height: 2,
					backgroundColor: '#fff',
				},
			}}
			style={{
				paddingTop: insets.top,
			}}
			lazy={true}>
			{TABS_LIST.map((tab, index) => (
				<Screen
					key={index}
					name={tab as any}
					children={props => <PopularScreen {...props} tab={tab} />}
					options={{
						tabBarLabel: () => (
							<Text
								style={{
									fontSize: 13,
									marginHorizontal: 6,
								}}>
								{tab}
							</Text>
						),
					}}
				/>
			))}
		</Navigator>
	);
};

const PopularTabRouteScreen = (PopularTabRoutePage as unknown) as FC;

export default PopularTabRouteScreen;
