import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerRouter from 'cnode/routes/drawer';
import TabRouter from 'cnode/routes/tab';
import ScanPage from 'cnode/pages/ScanPage';
import TopicDetailPage from 'cnode/pages/TopicDetailPage';

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
					<Screen
						name={EScreenName.Me}
						component={DrawerRouter}
						options={{ title: '个人中心' }}
					/>
					<Screen
						name={EScreenName.Scan}
						component={ScanPage}
						options={{ title: '扫描二维码' }}
					/>
					<Screen name={EScreenName.Detail} component={TopicDetailPage} />
				</Navigator>
			</NavigationContainer>
		);
	}
}
