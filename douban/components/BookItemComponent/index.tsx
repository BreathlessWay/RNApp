import React, { FC } from 'react';

import { View, Text, Image, TouchableOpacity } from 'react-native';

import Style from './style';

export type BookItemComponentPropType = {
	image: string;
	title: string;
	publisher: string;
	author: string;
	price: string;
	pages: string;
	onPress?: () => void;
};

const BookItemComponent: FC<BookItemComponentPropType> = (props) => {
	const { image, title, publisher, author, price, pages, onPress } = props;
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={Style.wrap}>
				<View>
					<Image
						source={{ uri: image }}
						style={Style.image}
						resizeMode={'contain'}
					/>
				</View>
				<View style={Style.content}>
					<View>
						<Text style={Style.title} numberOfLines={1}>
							{title}
						</Text>
					</View>
					<View>
						<Text style={Style.publisher}>出版社：{publisher}</Text>
					</View>
					<View>
						<Text style={Style.author}>作者：{author}</Text>
					</View>
					<View style={Style.bottom}>
						<Text style={Style.price}>售价：{price}</Text>
						<Text style={Style.page}>页数：{pages}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default BookItemComponent;
