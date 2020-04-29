import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerRouter from 'cnode/routes/drawer';
import Index from 'cnode/pages';
import ScanPage from 'cnode/pages/ScanPage';

import { EScreenName, RootStackParamList } from 'cnode/routes/type';

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export default class RootRouter extends Component {
	render(): React.ReactNode {
		return (
			<NavigationContainer>
				<Navigator
					initialRouteName={EScreenName.Home}
					screenOptions={{
						headerBackTitleVisible: false,
					}}>
					<Screen
						name={EScreenName.Home}
						component={DrawerRouter}
						options={{ title: 'CNode' }}
					/>
					<Screen name={EScreenName.Me} component={Index} />
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
