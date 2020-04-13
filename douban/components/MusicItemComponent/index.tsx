import React, { FC } from 'react';

import { View, Text, Image, TouchableOpacity } from 'react-native';

import Style from './style';

export type MusicItemComponentPropType = {
	image: string;
	title: string;
	author: string;
	pubdate: string;
	rate: string;
	onPress?: () => void;
};

const MusicItemComponent: FC<MusicItemComponentPropType> = (props) => {
	const { title, author, onPress, image, pubdate, rate } = props;

	return (
		<View style={Style.wrap}>
			<Image source={{ uri: image }} style={Style.image} />
			<View style={Style.row}>
				<Text>曲目：{title}</Text>
				<Text>演唱：{author}</Text>
			</View>
			<View style={Style.row}>
				<Text>时间：{pubdate}</Text>
				<Text>评分：{rate}</Text>
			</View>
			<TouchableOpacity onPress={onPress}>
				<Text style={Style.btn}>详情>></Text>
			</TouchableOpacity>
		</View>
	);
};

export default MusicItemComponent;
