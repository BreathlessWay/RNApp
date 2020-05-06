import React, { Component } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import TopicItem from 'cnode/components/TopicItem';

import { RouteProp } from '@react-navigation/native';
import { bindActionCreators, createSelector, Dispatch } from '@reduxjs/toolkit';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { EScreenName, RootStackParamList } from 'cnode/routes/type';
import { RootStateType } from 'cnode/stores/rootType';

import { ETopicsTab } from 'cnode/config/constant';

import rootActions from 'cnode/stores/rootActions';

import Style from './style';
import { TopicsItemType } from 'cnode/stores/topics/type';

const mapStateToProps = (state: RootStateType, props: TopicsPagePropType) => {
	return {
		topicItem: createSelector(
			(state: RootStateType, props: TopicsPagePropType) =>
				state.topics[props.route.params.tab],
			(data) => data,
		)(state, props),
	};
};

const mapDispatchToProps = (dispatch: Dispatch) =>
	bindActionCreators(
		{
			getTopics: ({
				tab,
				refreshing,
			}: {
				tab: ETopicsTab;
				refreshing?: boolean;
			}) => rootActions.getTopics({ tab, refreshing }),
		},
		dispatch,
	);

const connector = connect(mapStateToProps, mapDispatchToProps);

export type TopicsPageReduxPropType = ConnectedProps<typeof connector>;

export type TopicsPagePropType = {
	navigation: MaterialTopTabNavigationProp<RootStackParamList>;
	route: RouteProp<RootStackParamList, EScreenName.Home>;
};

class TopicsPage extends Component<
	TopicsPagePropType & TopicsPageReduxPropType
> {
	get topicItem() {
		return this.props.topicItem;
	}

	get tab() {
		return this.props.route.params.tab;
	}

	get canGetData() {
		const { hasMore, loading, refreshing } = this.topicItem;
		return hasMore && !loading && !refreshing;
	}

	componentDidMount(): void {
		this.props.getTopics({ refreshing: true, tab: this.tab });
	}

	handleRefresh = () => {
		if (this.canGetData) {
			this.props.getTopics({ refreshing: true, tab: this.tab });
		}
	};

	handleEndReached = () => {
		if (this.canGetData) {
			this.props.getTopics({ tab: this.tab });
		}
	};

	handlePress = (item: TopicsItemType) => {
		this.props.navigation.navigate(EScreenName.Detail, {
			id: item.id,
		});
	};

	render(): React.ReactNode {
		const { refreshing, list, hasMore, loading, empty } = this.topicItem;
		return (
			<FlatList
				refreshControl={
					<RefreshControl
						onRefresh={this.handleRefresh}
						refreshing={refreshing}
					/>
				}
				data={list}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TopicItem item={item} onPress={this.handlePress} />
				)}
				ListEmptyComponent={
					refreshing ? null : (
						<View style={Style.wrap}>
							<Text style={Style.emptyContent}>暂无数据</Text>
						</View>
					)
				}
				ListFooterComponent={
					empty ? null : (
						<View style={Style.wrap}>
							<Text style={Style.footerContent}>
								{loading
									? '加载中...'
									: hasMore
									? '上拉加载更多'
									: '没有更多了'}
							</Text>
						</View>
					)
				}
				onEndReached={this.handleEndReached}
				onEndReachedThreshold={0.5}
			/>
		);
	}
}

export default connector(TopicsPage);
