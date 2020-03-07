import React, { FC } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import WelcomeScreen from '@pages/welcome';
import SwitchRoutePage from './switch';
import DetailScreen from '@pages/detail';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { EScreenName, RootStackParamList } from './route.d';

import '@config/hydrate';

// 当使用导航时自带了SafeAreaView
const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

const RootRoutePage = () => {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Navigator initialRouteName={EScreenName.Welcome}>
					<Screen
						name={EScreenName.Welcome}
						component={WelcomeScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Screen
						name={EScreenName.Switch}
						component={SwitchRoutePage}
						options={{
							headerStyle: {
								backgroundColor: '#00d3f3',
							},
						}}
					/>
					<Screen
						name={EScreenName.Detail}
						component={DetailScreen}
						options={{
							headerShown: false,
						}}
					/>
				</Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
};

const RootRouteScreen = (RootRoutePage as unknown) as FC;

export default RootRouteScreen;
