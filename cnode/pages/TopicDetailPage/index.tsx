import React, { Component } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { View, Text } from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { bindActionCreators, createSelector, Dispatch } from '@reduxjs/toolkit';
import { RootStateType } from 'cnode/stores/rootType';
import { EScreenName, RootStackParamList } from 'cnode/routes/type';
import { TopicDetailType } from 'cnode/stores/topics/type';

import { request } from 'cnode/utils/request';
import { Subscription } from 'rxjs';

import Style from './style';

const getTopicDetail = createSelector(
	(state: RootStateType, props: TopicDetailPagePropType) => {
		const { tab, id } = props.route.params,
			list = state.topics[tab].list;
		return list.find((item) => item.id === id);
	},
	(detail) => detail,
);

const mapStateToProps = (
	state: RootStateType,
	props: TopicDetailPagePropType,
) => {
	return {
		propDetail: getTopicDetail(state, props),
		accesstoken: state.user.accesstoken,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) =>
	bindActionCreators({}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

export type TopicDetailPageReduxPropType = ConnectedProps<typeof connector>;

export type TopicDetailPagePropType = {
	navigation: StackNavigationProp<RootStackParamList>;
	route: RouteProp<RootStackParamList, EScreenName.Detail>;
};

export type TopicDetailPageStateType = {
	stateDetail: TopicDetailType | null;
};

class TopicDetailPage extends Component<
	TopicDetailPageReduxPropType & TopicDetailPagePropType,
	TopicDetailPageStateType
> {
	subscription: Subscription | null = null;

	readonly state = {
		stateDetail: null,
	};

	get id() {
		return this.props.route.params.id;
	}

	get detail() {
		return this.state.stateDetail || this.props.propDetail;
	}

	componentDidMount() {
		const { accesstoken } = this.props,
			query = accesstoken && `?accesstoken=${accesstoken}`;

		this.subscription = request<{ success: boolean; data: TopicDetailType }>({
			url: `/topic/${this.id}${query}`,
		}).subscribe({
			next: (value) =>
				this.setState({
					stateDetail: value.data,
				}),
			error: (err) => {
				console.log(err);
			},
			complete: () => {
				console.log('complete');
			},
		});
	}

	componentWillUnmount() {
		this.subscription?.unsubscribe();
	}

	render() {
		return (
			<View>
				<Text>{this.id}</Text>
			</View>
		);
	}
}

export default connector(TopicDetailPage);
