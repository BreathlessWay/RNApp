import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import TabRouter from 'douban/routes/tab';
import WebViewPage from 'douban/pages/WebViewPage';

import { EScreenName } from 'douban/routes/type';

const { Screen, Navigator } = createStackNavigator();

const RootRouter = () => {
	return (
		<NavigationContainer>
			<Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: '#0b7500',
					},
					headerTintColor: '#fff',
				}}>
				<Screen
					name={EScreenName.Home}
					component={TabRouter}
					initialParams={{ title: '图书' }}
				/>
				<Screen
					name={EScreenName.WebView}
					component={WebViewPage}
					initialParams={{ title: 'WebView', url: '' }}
				/>
			</Navigator>
		</NavigationContainer>
	);
};

export default RootRouter;
