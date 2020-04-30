import React, { Component } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { View, Text, FlatList } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { EScreenName, RootStackParamList } from 'cnode/routes/type';
import { RootStateType } from 'cnode/stores/rootType';

import Style from './style';

const mapStateToProps = (state: RootStateType) => {
	return {
		topics: state.topics,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) =>
	bindActionCreators({}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

export type TopicsPageReduxPropType = ConnectedProps<typeof connector>;

export type TopicsPagePropType = {
	navigation: MaterialTopTabNavigationProp<RootStackParamList>;
	route: RouteProp<RootStackParamList, EScreenName.Home>;
};

class TopicsPage extends Component<
	TopicsPagePropType & TopicsPageReduxPropType
> {
	componentDidMount(): void {
		console.log(this.props.route.params.tab);
	}

	render(): React.ReactNode {
		return (
			<View>
				<Text>{this.props.route.params.tab}</Text>
			</View>
		);
	}
}

export default connector(TopicsPage);
