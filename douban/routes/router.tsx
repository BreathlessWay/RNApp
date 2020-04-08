import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import TabRouter from 'douban/routes/tab';
import WebViewPage from 'douban/pages/WebViewPage';

import { EScreenName } from 'douban/routes/type';

const { Screen, Navigator } = createStackNavigator();

const Router = () => {
	return (
		<NavigationContainer>
			<Navigator>
				<Screen name={EScreenName.Home} component={TabRouter} />
				<Screen name={EScreenName.WebView} component={WebViewPage} />
			</Navigator>
		</NavigationContainer>
	);
};

export default Router;
