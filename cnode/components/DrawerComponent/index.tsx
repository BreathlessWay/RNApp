import React, { Component } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { DrawerItem, DrawerNavigationProp } from '@react-navigation/drawer';
import { EScreenName, RootStackParamList } from 'cnode/routes/type';
import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { RootStateType } from 'cnode/stores/rootType';

import dayjs from 'dayjs';

import Style from './style';
import rootActions from 'cnode/stores/rootActions';

const mapStateToProps = (state: RootStateType) => {
	return {
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) =>
	bindActionCreators(
		{
			logout: () => rootActions.logout(),
		},
		dispatch,
	);

const connector = connect(mapStateToProps, mapDispatchToProps);

export type DrawerComponentPropType = {
	navigation: DrawerNavigationProp<RootStackParamList>;
} & ConnectedProps<typeof connector>;

class DrawerComponent extends Component<DrawerComponentPropType> {
	handleScan = async () => {
		const { navigation } = this.props;
		navigation.toggleDrawer();
		navigation.navigate(EScreenName.Scan);
	};

	get joinTime() {
		const create_at = this.props.user.userInfo?.create_at;
		if (create_at) {
			return dayjs(create_at).format('YYYY-MM-DD');
		}
		return '';
	}

	render(): React.ReactNode {
		const {
			user: { isLogin, userInfo, count },
			navigation,
		} = this.props;

		return isLogin && userInfo ? (
			<View>
				<View style={Style.user}>
					<Image source={{ uri: userInfo.avatar_url }} style={Style.avatar} />
					<Text style={Style.name}>{userInfo.loginname}</Text>
					<View style={Style.info}>
						<Text style={Style.time}>{this.joinTime}</Text>
						<Text style={Style.score}>积分: {userInfo.score}</Text>
					</View>
				</View>
				<DrawerItem
					label={() => (
						<View style={Style.item}>
							<View style={Style.icon}>
								<Feather name={'at-sign'} size={14} color={'#666'} />
							</View>
							<Text style={Style.label}>我的消息</Text>
							{count ? <Text style={Style.count}>{count}</Text> : null}
						</View>
					)}
					onPress={() => {
						navigation.closeDrawer();
						navigation.navigate(EScreenName.Message);
					}}
				/>
				<DrawerItem
					label={() => (
						<View style={Style.item}>
							<View style={Style.icon}>
								<MaterialCommunityIcons
									name={'text-subject'}
									size={14}
									color={'#666'}
								/>
							</View>
							<Text style={Style.label}>我的发帖</Text>
						</View>
					)}
					onPress={() => {
						navigation.toggleDrawer();
						navigation.navigate(EScreenName.Posts);
					}}
				/>
				<DrawerItem
					label={() => (
						<View style={Style.item}>
							<View style={Style.icon}>
								<FontAwesome name="stack-overflow" size={14} color={'#666'} />
							</View>
							<Text style={Style.label}>我的回复</Text>
						</View>
					)}
					onPress={() => {
						navigation.toggleDrawer();
						navigation.navigate(EScreenName.Reply);
					}}
				/>
				<DrawerItem
					label={() => (
						<View style={Style.item}>
							<View style={Style.icon}>
								<SimpleLineIcons name={'tag'} size={14} color={'#666'} />
							</View>
							<Text style={Style.label}>我的收藏</Text>
						</View>
					)}
					onPress={() => {
						navigation.toggleDrawer();
						navigation.navigate(EScreenName.Collection);
					}}
				/>
				<DrawerItem
					label={() => (
						<View style={Style.item}>
							<View style={Style.icon}>
								<AntDesign name={'logout'} size={14} color={'#666'} />
							</View>
							<Text style={Style.label}>退出</Text>
						</View>
					)}
					onPress={() => {
						navigation.toggleDrawer();
						this.props.logout();
					}}
				/>
			</View>
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
