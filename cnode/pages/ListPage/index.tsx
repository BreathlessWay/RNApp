import React, { Component, ComponentClass } from 'react';

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
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) =>
	bindActionCreators({}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

export type ListPageReduxPropType = ConnectedProps<typeof connector>;

export type ListPagePropType = {
	navigation: MaterialTopTabNavigationProp<
		RootStackParamList,
		EScreenName.Home
	>;
	route: RouteProp<RootStackParamList, EScreenName.Home>;
};

class ListPage extends Component<ListPagePropType & ListPageReduxPropType> {
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

export default connector(ListPage) as ComponentClass<ListPagePropType>;
