import React, { FC } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import WelcomeScreen from '@pages/welcome';
import SwitchRoutePage from './switch';
import DetailScreen from '@pages/detail';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { EScreenName, RootStackParamList } from './route.d';

import { HEADER_THEME_COLOR } from '@config/constant';

import '@config/hydrate';

// 当使用导航时自带了SafeAreaView
const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

const RootRoutePage = () => {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Navigator
					initialRouteName={EScreenName.Welcome}
					screenOptions={{
						headerStyle: {
							backgroundColor: HEADER_THEME_COLOR,
						},
					}}>
					<Screen
						name={EScreenName.Welcome}
						component={WelcomeScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Screen name={EScreenName.Switch} component={SwitchRoutePage} />
					<Screen name={EScreenName.Detail} component={DetailScreen} />
				</Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
};

const RootRouteScreen = (RootRoutePage as unknown) as FC;

export default RootRouteScreen;
