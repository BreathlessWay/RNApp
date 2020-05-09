import React, { Component } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import MessageItem from 'cnode/components/MessageItem';

import rootActions from 'cnode/stores/rootActions';

import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { RouteProp } from '@react-navigation/native';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { EScreenName, RootStackParamList } from 'cnode/routes/type';
import { RootStateType } from 'cnode/stores/rootType';
import { MessageItemType } from 'cnode/stores/message/type';

import { EMessageTab } from 'cnode/config/constant';

import Style from './style';

const mapStateToProps = (state: RootStateType) => {
	return {
		message: state.message,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) =>
	bindActionCreators(
		{
			getMessage: () => rootActions.getMessage(),
			markRead: (messageId) => rootActions.markRead({ messageId }),
		},
		dispatch,
	);

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

	get messageList(): Array<MessageItemType> {
		if (this.tab) {
			return this.props.message[this.tab];
		}
		return [];
	}

	get showFab() {
		return this.tab === EMessageTab.Unread && this.messageList.length > 0;
	}

	handleRefresh = () => {
		this.props.getMessage();
	};

	handlePress = (item: MessageItemType) => {
		const { navigation, markRead } = this.props;
		if (item.has_read) {
			navigation.navigate(EScreenName.Detail, {
				id: item.topic.id,
			});
		} else {
			markRead(item.id);
			navigation.navigate(EScreenName.Detail, {
				id: item.topic.id,
			});
		}
	};

	render() {
		const { loading } = this.props.message;
		return (
			<View style={Style.wrap}>
				<FlatList
					refreshControl={
						<RefreshControl
							onRefresh={this.handleRefresh}
							refreshing={loading}
						/>
					}
					data={this.messageList}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<MessageItem item={item} onPress={this.handlePress} />
					)}
					ListEmptyComponent={
						<View style={Style.emptyWrap}>
							<Text style={Style.emptyContent}>暂无数据</Text>
						</View>
					}
				/>
				{this.showFab && (
					<View style={Style.fab}>
						<Text style={Style.fabContent}>全部</Text>
						<Text style={Style.fabContent}>已读</Text>
					</View>
				)}
			</View>
		);
	}
}

export default connector(MessagePage);
