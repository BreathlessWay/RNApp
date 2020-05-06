import React, { Component } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { View, Text, FlatList } from 'react-native';
import TopicItem from 'cnode/components/TopicItem';

import { RouteProp } from '@react-navigation/native';
import { bindActionCreators, createSelector, Dispatch } from '@reduxjs/toolkit';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { EScreenName, RootStackParamList } from 'cnode/routes/type';
import { RootStateType } from 'cnode/stores/rootType';
import { TopicsItemType } from 'cnode/stores/topics/type';

import { EMyTopicType, ETopicsTab } from 'cnode/config/constant';

import rootActions from 'cnode/stores/rootActions';

import Style from './style';

const getTopicList = createSelector(
	(state: RootStateType, props: MyTopicPagePropType) => {
		const type = props.route.params.type;
		switch (type) {
			case EMyTopicType.Posts:
				return state.user.userInfo?.recent_topics ?? [];
			case EMyTopicType.Reply:
				return state.user.userInfo?.recent_replies ?? [];
			case EMyTopicType.Collection:
				return state.user.collection ?? [];
		}
	},
	(data) => data,
);

const mapStateToProps = (state: RootStateType, props: MyTopicPagePropType) => {
	return {
		list: getTopicList(state, props),
	};
};

const mapDispatchToProps = (dispatch: Dispatch) =>
	bindActionCreators(
		{
			getCollections: () => rootActions.getCollections(),
		},
		dispatch,
	);

const connector = connect(mapStateToProps, mapDispatchToProps);

export type MyTopicPageReduxPropType = ConnectedProps<typeof connector>;

export type MyTopicPagePropType = {
	navigation: DrawerNavigationProp<RootStackParamList>;
	route: RouteProp<RootStackParamList, EScreenName.Me>;
};

class MyTopicPage extends Component<
	MyTopicPagePropType & MyTopicPageReduxPropType
> {
	componentDidMount(): void {
		this.props.getCollections();
	}

	handlePress = (item: TopicsItemType) => {
		this.props.navigation.navigate(EScreenName.Detail, {
			id: item.id,
			tab: item.tab,
		});
	};

	render(): React.ReactNode {
		const { list } = this.props;
		return (
			<FlatList
				data={list}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TopicItem item={item} onPress={this.handlePress} />
				)}
				ListEmptyComponent={
					<View style={Style.wrap}>
						<Text style={Style.emptyContent}>暂无数据</Text>
					</View>
				}
			/>
		);
	}
}

export default connector(MyTopicPage);
