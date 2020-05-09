import React, { Component } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import MessagePage from 'cnode/pages/MessagePage';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import rootActions from 'cnode/stores/rootActions';

import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { RootStateType } from 'cnode/stores/rootType';
import { EScreenName, RootStackParamList } from 'cnode/routes/type';

import { EMessageTab, THEME_COLOR } from 'cnode/config/constant';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';

const { Navigator, Screen } = createMaterialTopTabNavigator();

const mapStateToProps = (state: RootStateType) => {
	return {};
};

const mapDispatchToProps = (dispatch: Dispatch) =>
	bindActionCreators(
		{
			getMessage: () => rootActions.getMessage(),
		},
		dispatch,
	);

const connector = connect(mapStateToProps, mapDispatchToProps);

export type MessageTabRouterReduxPropType = ConnectedProps<typeof connector>;

export type MessageTabRouterPropType = {
	navigation: DrawerNavigationProp<RootStackParamList>;
	route: RouteProp<RootStackParamList, EScreenName.Message>;
};

class MessageTabRouter extends Component<
	MessageTabRouterPropType & MessageTabRouterReduxPropType
> {
	componentDidMount(): void {
		global.stackNavigation.setOptions({
			title: '我的消息',
		});
		this.props.getMessage();
	}

	render(): React.ReactNode {
		return (
			<Navigator
				initialRouteName={EScreenName.MessageUnread}
				lazy={true}
				tabBarOptions={{
					indicatorStyle: {
						backgroundColor: THEME_COLOR,
					},
				}}>
				<Screen
					name={EScreenName.MessageUnread}
					options={{ title: '未读消息' }}
					component={MessagePage}
					initialParams={{
						tab: EMessageTab.Unread,
					}}
				/>
				<Screen
					name={EScreenName.MessageRead}
					options={{ title: '已读消息' }}
					component={MessagePage}
					initialParams={{
						tab: EMessageTab.Read,
					}}
				/>
			</Navigator>
		);
	}
}

export default connector(MessageTabRouter);
