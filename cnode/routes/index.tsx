import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerRouter from 'cnode/routes/drawer';
import TabRouter from 'cnode/routes/tab';
import Index from 'cnode/pages';
import ScanPage from 'cnode/pages/ScanPage';

import { EScreenName, RootStackParamList } from 'cnode/routes/type';

import { THEME_COLOR } from 'cnode/config/constant';

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export default class RootRouter extends Component {
	render(): React.ReactNode {
		return (
			<NavigationContainer>
				<Navigator
					initialRouteName={EScreenName.Home}
					screenOptions={{
						headerBackTitleVisible: false,
						headerTintColor: '#fff',
						headerStyle: {
							backgroundColor: THEME_COLOR,
						},
					}}>
					<Screen
						name={EScreenName.Home}
						component={TabRouter}
						options={{ title: 'CNode' }}
					/>
					<Screen name={EScreenName.Me} component={DrawerRouter} />
					<Screen
						name={EScreenName.Scan}
						component={ScanPage}
						options={{ title: '扫描二维码' }}
					/>
					<Screen name={EScreenName.Detail} component={Index} />
					<Screen name={EScreenName.WebView} component={Index} />
				</Navigator>
			</NavigationContainer>
		);
	}
}
