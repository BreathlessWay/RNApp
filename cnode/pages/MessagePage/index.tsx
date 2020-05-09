import React, { Component } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { ScrollView, Text, View } from 'react-native';

import { bindActionCreators, createSelector, Dispatch } from '@reduxjs/toolkit';
import { RouteProp } from '@react-navigation/native';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { EScreenName, RootStackParamList } from 'cnode/routes/type';
import { RootStateType } from 'cnode/stores/rootType';

import { EMessageTab } from 'cnode/config/constant';

import Style from './style';

const mapStateToProps = (state: RootStateType, props: MessagePagePropType) => {
	return {
		message: createSelector(
			(state: RootStateType, props: MessagePagePropType) => {
				const tab = props.route.params.tab;
				if (props.route.params.tab) {
					return state.message[tab];
				}
				return [];
			},
			(data) => data,
		)(state, props),
	};
};

const mapDispatchToProps = (dispatch: Dispatch) =>
	bindActionCreators({}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

export type MessagePageReduxPropType = ConnectedProps<typeof connector>;

export type MessagePagePropType = {
	navigation: MaterialTopTabNavigationProp<RootStackParamList>;
	route: RouteProp<RootStackParamList, EScreenName.Message>;
};

class MessagePage extends Component<
	MessagePagePropType & MessagePageReduxPropType
> {
	get tab(): EMessageTab {
		return this.props.route.params.tab;
	}

	componentDidMount() {
		console.log(this.props.message);
	}

	render() {
		return <ScrollView></ScrollView>;
	}
}

export default connector(MessagePage);
