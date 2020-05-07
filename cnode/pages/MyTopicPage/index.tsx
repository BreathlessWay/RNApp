import React, { Component } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import TopicItem from 'cnode/components/TopicItem';

import { RouteProp } from '@react-navigation/native';
import { bindActionCreators, createSelector, Dispatch } from '@reduxjs/toolkit';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { EScreenName, RootStackParamList } from 'cnode/routes/type';
import { RootStateType } from 'cnode/stores/rootType';
import { TopicsItemType } from 'cnode/stores/topics/type';

import { EMyTopicType } from 'cnode/config/constant';

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
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) =>
	bindActionCreators(
		{
			getCollections: () => rootActions.getCollections(),
			fetchUser: ({ avatar_url, loginname, id }) =>
				rootActions.fetchUser({ avatar_url, id, loginname, success: true }),
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
		const type = this.props.route.params.type;
		let title = '';
		switch (type) {
			case EMyTopicType.Posts: {
				title = '我的发帖';
				break;
			}
			case EMyTopicType.Reply: {
				title = '我的回复';
				break;
			}
			case EMyTopicType.Collection: {
				title = '我的收藏';
				this.props.getCollections();
				break;
			}
		}
		global.stackNavigation.setOptions({
			title,
		});
	}

	handlePress = (item: TopicsItemType) => {
		this.props.navigation.navigate(EScreenName.Detail, {
			id: item.id,
		});
	};

	handleRefresh = () => {
		const {
			route: {
				params: { type },
			},
			getCollections,
			fetchUser,
			user: { id, userInfo },
		} = this.props;
		switch (type) {
			case EMyTopicType.Posts:
			case EMyTopicType.Reply: {
				fetchUser({
					avatar_url: userInfo?.avatar_url,
					loginname: userInfo?.loginname,
					id,
				});
				break;
			}
			case EMyTopicType.Collection: {
				getCollections();
				break;
			}
		}
	};

	render(): React.ReactNode {
		const {
			list,
			user: { loading },
		} = this.props;
		return (
			<FlatList
				refreshControl={
					<RefreshControl onRefresh={this.handleRefresh} refreshing={loading} />
				}
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
