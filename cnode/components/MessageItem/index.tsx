import React, { Component } from 'react';

import { View, Text, TouchableOpacity, Image } from 'react-native';

import { MessageItemType } from 'cnode/stores/message/type';

import Style from './style';

export type MessageItemPropType = {
	item: MessageItemType;
	onPress: (item: MessageItemType) => void;
};

export default class MessageItem extends Component<MessageItemPropType> {
	handlePress = () => {
		this.props.onPress(this.props.item);
	};

	render() {
		const { item } = this.props;
		return (
			<TouchableOpacity onPress={this.handlePress} style={Style.wrap}>
				<View style={Style.author}>
					<Image
						source={{ uri: item.author.avatar_url }}
						style={Style.avatar}
					/>
					<Text style={Style.name}>{item.author.loginname}</Text>
				</View>
				<View style={Style.replay}>
					<Text>回复了</Text>
					<Text style={Style.topic} numberOfLines={1}>
						{item.topic.title}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
}
