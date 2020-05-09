import React, { Component } from 'react';

import { View, Text, TouchableOpacity, Image } from 'react-native';
import TopicTabItem from 'cnode/components/TopicTabItem';

import { TopicsItemType } from 'cnode/stores/topics/type';

import dayjs from 'dayjs';

import Style from './style';

export type TopicItemPropType = {
	item: TopicsItemType;
	onPress: (item: TopicsItemType) => void;
};

export default class TopicItem extends Component<TopicItemPropType> {
	handlePress = () => {
		this.props.onPress(this.props.item);
	};

	render() {
		const {
			props: { item },
		} = this;

		return (
			<TouchableOpacity onPress={this.handlePress} style={Style.item}>
				<View>
					<View style={Style.top}>
						<TopicTabItem tab={item.tab} good={item.good} top={item.top} />
						<Text numberOfLines={1} style={Style.title}>
							{item.title}
						</Text>
						{item.reply_count !== void 0 ? (
							<Text style={Style.count}>
								{item.reply_count + '/' + item.visit_count}
							</Text>
						) : null}
					</View>
					<View style={Style.bottom}>
						<View style={Style.author}>
							<Image
								source={{ uri: item.author.avatar_url }}
								style={Style.avatar}
							/>
							<Text style={Style.name}>{item.author.loginname}</Text>
						</View>
						{item.create_at !== void 0 ? (
							<Text style={Style.tip}>
								发帖时间：{dayjs(item.create_at).format('YYYY-MM-DD')}
							</Text>
						) : null}
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}
