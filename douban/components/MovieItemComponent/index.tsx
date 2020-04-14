import React, { FC } from 'react';

import { View, Text, TouchableOpacity, Image } from 'react-native';

import Style from './style';

export type MovieItemComponentPropType = {
	image: string;
	title: string;
	casts: Array<string>;
	rate: string;
	year: string;
	genres: Array<string>;
	onPress?: () => void;
};

const MovieItemComponent: FC<MovieItemComponentPropType> = (props) => {
	const { image, title, rate, genres, casts, year, onPress } = props;

	return (
		<TouchableOpacity onPress={onPress}>
			<View style={Style.wrap}>
				<Image source={{ uri: image }} style={Style.image} />
				<View style={Style.content}>
					<Text style={Style.title} numberOfLines={1}>
						名称：{title}
					</Text>
					<View style={Style.casts}>
						<Text>演员：</Text>
						{casts.map((cast) => (
							<Text key={cast} style={Style.tag}>
								{cast}
							</Text>
						))}
					</View>
					<Text style={Style.rate}>评分：{rate}</Text>
					<Text style={Style.year}>时间：{year}</Text>
					<View style={Style.genres}>
						<Text>标签：</Text>
						{genres.map((genre) => (
							<Text key={genre} style={Style.tag}>
								{genre}
							</Text>
						))}
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default MovieItemComponent;
