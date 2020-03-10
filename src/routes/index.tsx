import React, { FC } from 'react';

import WelcomeScreen from '@pages/welcome';
import DetailScreen from '@pages/detail';
import AboutScreen from '@pages/about';
import AuthorScreen from '@pages/author';
import WebViewScreen from '@pages/webview';
import SwitchRoutePage from './switch';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { EScreenName, RootStackParamList } from './route.d';

import { HEADER_THEME_COLOR } from '@config/constant';

import '@config/hydrate';

// 当使用导航时自带了SafeAreaView
const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

const RootRoutePage = () => {
	return (
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
				<Screen
					name={EScreenName.About}
					component={AboutScreen}
					options={{
						headerShown: false,
					}}
				/>
				<Screen
					name={EScreenName.Author}
					component={AuthorScreen}
					options={{
						headerShown: false,
					}}
				/>
				<Screen name={EScreenName.WebView} component={WebViewScreen} />
			</Navigator>
		</NavigationContainer>
	);
};

const RootRouteScreen = (RootRoutePage as unknown) as FC;

export default RootRouteScreen;
