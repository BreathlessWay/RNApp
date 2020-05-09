import React, { Component } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
} from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DrawerComponent from 'cnode/components/DrawerComponent';
import MyTopicPage from 'cnode/pages/MyTopicPage';
import MePage from 'cnode/pages/MePage';
import MessageTabRouter from 'cnode/routes/messageTab';

import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EScreenName, RootStackParamList } from 'cnode/routes/type';
import { EMyTopicType } from 'cnode/config/constant';
import { RootStateType } from 'cnode/stores/rootType';

const { Navigator, Screen } = createDrawerNavigator<RootStackParamList>();

const mapStateToProps = (state: RootStateType) => {
	return {};
};

const mapDispatchToProps = (dispatch: Dispatch) =>
	bindActionCreators({}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

export type DrawerRouterReduxPropType = ConnectedProps<typeof connector>;

export type DrawerRouterPropType = {
	navigation: StackNavigationProp<RootStackParamList, EScreenName.Home>;
	route: RouteProp<RootStackParamList, EScreenName.Home>;
};

class DrawerRouter extends Component<
	DrawerRouterPropType & DrawerRouterReduxPropType
> {
	componentDidMount(): void {
		const { navigation } = this.props;
		global.stackNavigation = navigation;
		navigation.setOptions({
			headerRight: () => (
				<FontAwesome
					name={'bars'}
					color={'#fff'}
					style={{ paddingHorizontal: 10 }}
					size={22}
					onPress={() => global.drawerNavigation.toggleDrawer()}
				/>
			),
		});
	}

	render(): React.ReactNode {
		return (
			<Navigator
				initialRouteName={EScreenName.Home}
				drawerPosition="right"
				drawerContent={(props) => {
					global.drawerNavigation = props.navigation;
					return (
						<DrawerContentScrollView {...props}>
							<DrawerComponent navigation={props.navigation as any} />
						</DrawerContentScrollView>
					);
				}}>
				<Screen name={EScreenName.Home} component={MePage} />
				<Screen name={EScreenName.Message} component={MessageTabRouter} />
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

export default connector(DrawerRouter);
