import React, { Component } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { Image, TouchableOpacity } from 'react-native';
import ListPage from 'cnode/pages/TopicsPage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { StackNavigationProp } from '@react-navigation/stack';
import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { RootStateType } from 'cnode/stores/rootType';
import { EScreenName, RootStackParamList } from 'cnode/routes/type';

import { ETopicsTag, THEME_COLOR } from 'cnode/config/constant';

const { Navigator, Screen } = createMaterialTopTabNavigator();

const mapStateToProps = (state: RootStateType) => {
	return {
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) =>
	bindActionCreators({}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

export type TabRouterReduxPropType = ConnectedProps<typeof connector>;

export type TabRouterPropType = {
	navigation: StackNavigationProp<RootStackParamList>;
};

class TabRouter extends Component<TabRouterPropType & TabRouterReduxPropType> {
	componentDidMount(): void {
		this.setHeader();
	}

	componentDidUpdate(
		prevProps: Readonly<TabRouterPropType & TabRouterReduxPropType>,
	): void {
		if (prevProps.user.isLogin !== this.props.user.isLogin) {
			this.setHeader();
		}
	}

	setHeader = () => {
		const {
			user: { isLogin, userInfo },
			navigation,
		} = this.props;

		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					onPress={() => navigation.navigate(EScreenName.Me)}
					style={{ marginRight: 10 }}>
					{isLogin ? (
						<Image
							source={{ uri: userInfo?.avatar_url }}
							style={{
								width: 30,
								height: 30,
								borderRadius: 15,
							}}
						/>
					) : (
						<FontAwesome name="user-circle" size={24} color={'#fff'} />
					)}
				</TouchableOpacity>
			),
		});
	};

	render(): React.ReactNode {
		return (
			<Navigator
				initialRouteName={EScreenName.All}
				lazy={true}
				tabBarOptions={{
					scrollEnabled: true,
					indicatorStyle: {
						backgroundColor: THEME_COLOR,
					},
				}}>
				<Screen
					name={EScreenName.All}
					options={{ title: '全部' }}
					component={ListPage}
					initialParams={{
						tab: ETopicsTag.All,
					}}
				/>
				<Screen
					name={EScreenName.Ask}
					component={ListPage}
					options={{ title: '问答' }}
					initialParams={{
						tab: ETopicsTag.Ask,
					}}
				/>
				<Screen
					name={EScreenName.Share}
					component={ListPage}
					options={{ title: '分享' }}
					initialParams={{
						tab: ETopicsTag.Share,
					}}
				/>
				<Screen
					name={EScreenName.Job}
					component={ListPage}
					options={{ title: '工作机会' }}
					initialParams={{
						tab: ETopicsTag.Job,
					}}
				/>
				<Screen
					name={EScreenName.Good}
					component={ListPage}
					options={{ title: '精华' }}
					initialParams={{
						tab: ETopicsTag.Good,
					}}
				/>
			</Navigator>
		);
	}
}

export default connector(TabRouter);
