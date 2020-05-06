import React, { Component } from 'react';

import { View, Text, TouchableOpacity, Image } from 'react-native';

import { TopicsItemType } from 'cnode/stores/topics/type';

import { ETopicsTab } from 'cnode/config/constant';

import Style from './style';

export type TopicItemPropType = {
	item: TopicsItemType;
	onPress: (item: TopicsItemType) => void;
};

export default class TopicItem extends Component<TopicItemPropType> {
	get tab() {
		const { good, top, tab } = this.props.item;
		if (top) {
			return '置顶';
		}
		if (good) {
			return '精华';
		}
		switch (tab) {
			case ETopicsTab.Ask:
				return '问答';
			case ETopicsTab.Job:
				return '工作';
			case ETopicsTab.Share:
				return '分享';
		}
	}

	get isGoodOrTop() {
		const { good, top } = this.props.item;
		return good || top;
	}

	handlePress = () => {
		this.props.onPress(this.props.item);
	};

	render() {
		const {
			tab,
			isGoodOrTop,
			props: { item },
		} = this;

		const tabGoodStyle = isGoodOrTop ? Style.good : {};

		return (
			<TouchableOpacity onPress={this.handlePress} style={Style.item}>
				<View>
					<View style={Style.top}>
						<Text style={{ ...Style.tab, ...tabGoodStyle }}>{tab}</Text>
						<Text numberOfLines={1} style={Style.title}>
							{item.title}
						</Text>
					</View>
					<View style={Style.bottom}>
						<View style={Style.author}>
							<Image
								source={{ uri: item.author.avatar_url }}
								style={Style.avatar}
							/>
							<Text style={Style.name}>{item.author.loginname}</Text>
						</View>
						<Text style={Style.count}>
							{item.reply_count + '/' + item.visit_count}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}
