import React, { Component } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { DrawerNavigationProp } from '@react-navigation/drawer';
import { EScreenName, RootStackParamList } from 'cnode/routes/type';
import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { RootStateType } from 'cnode/stores/rootType';

import Style from './style';

const mapStateToProps = (state: RootStateType) => {
	return {
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) =>
	bindActionCreators({}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

export type DrawerComponentPropType = {
	navigation: DrawerNavigationProp<RootStackParamList>;
} & ConnectedProps<typeof connector>;

class DrawerComponent extends Component<DrawerComponentPropType> {
	componentDidMount(): void {}

	handleScan = async () => {
		const { navigation } = this.props;
		navigation.toggleDrawer();
		navigation.navigate(EScreenName.Scan);
	};

	render(): React.ReactNode {
		const {
			user: { isLogin, userInfo },
		} = this.props;
		console.log(userInfo);
		return isLogin ? (
			<View></View>
		) : (
			<TouchableOpacity onPress={this.handleScan}>
				<View style={Style.login}>
					<FontAwesome name="user-circle" size={100} color={'#ccc'} />
					<Text style={Style.loginTip}>扫码登录</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

export default connector(DrawerComponent);
