import React, { Component } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { View, Text, Image, ScrollView } from 'react-native';

import rootActions from 'cnode/stores/rootActions';

import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { RootStateType } from 'cnode/stores/rootType';

import Style from './style';
import HTMLView from 'react-native-htmlview';

const mapStateToProps = (state: RootStateType) => {
	return {
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) =>
	bindActionCreators({}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

export type MePageReduxPropType = ConnectedProps<typeof connector>;

class MePage extends Component<MePageReduxPropType> {
	componentDidMount(): void {}

	render(): React.ReactNode {
		const {
			user: { userInfo, isLogin },
		} = this.props;
		return (
			<ScrollView style={Style.wrap}>
				<Text style={Style.title}>一个基于React-Native的CNode</Text>
				<View style={Style.link}>
					<Text>项目地址：</Text>
					<View style={Style.href}>
						<HTMLView
							value={`<a href="https://github.com/BreathlessWay/RNApp">https://github.com/BreathlessWay/RNApp</a>`}
						/>
					</View>
				</View>
				<View>
					<Text>项目介绍：</Text>
					<Text style={Style.intro}>
						使用 React-Native+Redux+RxJs+Typescript+React-Navigation
						技术，以CNode开放Api为基础开发的App版CNode
					</Text>
				</View>
				{isLogin && (
					<View style={Style.about}>
						<Image
							source={{ uri: userInfo?.avatar_url }}
							style={Style.avatar}
						/>
						<Text style={Style.name}>{userInfo?.loginname}</Text>
					</View>
				)}
			</ScrollView>
		);
	}
}

export default connector(MePage);
