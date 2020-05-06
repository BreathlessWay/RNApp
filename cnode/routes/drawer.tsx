import React, { Component } from 'react';

import {
	createDrawerNavigator,
	DrawerContentScrollView,
} from '@react-navigation/drawer';
import DrawerComponent from 'cnode/components/DrawerComponent';
import Index from 'cnode/pages';
import { View } from 'react-native';
import MyTopicPage from 'cnode/pages/MyTopicPage';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EScreenName, RootStackParamList } from 'cnode/routes/type';
import { EMyTopicType } from 'cnode/config/constant';

const { Navigator, Screen } = createDrawerNavigator<RootStackParamList>();

export type DrawerRouterPropType = {
	navigation: StackNavigationProp<RootStackParamList, EScreenName.Home>;
	route: RouteProp<RootStackParamList, EScreenName.Home>;
};

export default class DrawerRouter extends Component<DrawerRouterPropType> {
	componentDidMount(): void {}

	render(): React.ReactNode {
		return (
			<Navigator
				drawerPosition="right"
				drawerContent={(props) => {
					return (
						<DrawerContentScrollView {...props}>
							<DrawerComponent navigation={props.navigation as any} />
						</DrawerContentScrollView>
					);
				}}>
				<Screen name={EScreenName.Home} component={Index} />
				<Screen name={EScreenName.Message} component={View} />
				<Screen
					name={EScreenName.Posts}
					component={MyTopicPage}
					initialParams={{
						type: EMyTopicType.Posts,
					}}
				/>
				<Screen
					name={EScreenName.Reply}
					component={MyTopicPage}
					initialParams={{
						type: EMyTopicType.Reply,
					}}
				/>
				<Screen
					name={EScreenName.Collection}
					component={MyTopicPage}
					initialParams={{
						type: EMyTopicType.Collection,
					}}
				/>
			</Navigator>
		);
	}
}
