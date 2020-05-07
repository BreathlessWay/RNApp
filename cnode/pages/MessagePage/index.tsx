import React, { Component } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { ScrollView, Text, View } from 'react-native';

import rootActions from 'cnode/stores/rootActions';

import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { RouteProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { EScreenName, RootStackParamList } from 'cnode/routes/type';
import { RootStateType } from 'cnode/stores/rootType';

import Style from './style';

const mapStateToProps = (state: RootStateType) => {
	return {};
};

const mapDispatchToProps = (dispatch: Dispatch) =>
	bindActionCreators({}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

export type MessagePageReduxPropType = ConnectedProps<typeof connector>;

export type MessagePagePropType = {
	navigation: DrawerNavigationProp<RootStackParamList>;
	route: RouteProp<RootStackParamList, EScreenName.Me>;
};

class MessagePage extends Component<
	MessagePagePropType & MessagePageReduxPropType
> {
	componentDidMount() {
		global.stackNavigation.setOptions({
			title: '我的消息',
		});
	}

	render() {
		return <ScrollView></ScrollView>;
	}
}

export default connector(MessagePage);
