import React, { FC } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import WelcomeScreen from '@pages/welcome';
import SwitchRoutePage from './switch';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { EScreenName, RootStackParamList } from './route.d';

// 当使用导航时自带了SafeAreaView
const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

const RootRoutePage = () => {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Navigator initialRouteName={EScreenName.Welcome} headerMode="none">
					<Screen name={EScreenName.Welcome} component={WelcomeScreen} />
					<Screen
						name={EScreenName.Switch}
						component={SwitchRoutePage}
						initialParams={{
							theme: '#fff',
						}}
					/>
				</Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
};

const RootRouteScreen = (RootRoutePage as unknown) as FC;

export default RootRouteScreen;
