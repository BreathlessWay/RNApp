import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from '@react-navigation/native';
import TabRouter from 'douban/routes/tab';

const { Screen, Navigator } = createStackNavigator();

const Router = () => {
	return (
		<NavigationContainer>
			<Navigator>
				<Screen name="Home" component={TabRouter} />
			</Navigator>
		</NavigationContainer>
	);
};

export default Router;
