import React, { FC } from 'react';

import { View, Text, TouchableOpacity, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';
import { ReposItemType } from '@stores/popular/popular';

import { EScreenName, RootStackParamList } from '@routes/route.d';

import Style from './style';

const ReposListItem: FC<ReposItemType> = props => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	const handlePress = () => {
		navigation.navigate(EScreenName.Detail, {
			id: props.id,
		});
	};

	const handleFavorite = () => {};

	return (
		<TouchableOpacity onPress={handlePress}>
			<View style={Style.wrap}>
				<Text style={Style.title}>{props.full_name}</Text>
				<Text style={Style.desc}>{props.description}</Text>
				<View style={Style.footer}>
					{props.owner && (
						<View style={Style.column}>
							<Text>Author:</Text>
							<Image
								source={{ uri: props.owner.avatar_url }}
								style={Style.avatar}
							/>
						</View>
					)}
					<View style={Style.column}>
						<Text>Stars:</Text>
						<Text>{props.stargazers_count}</Text>
					</View>
					<TouchableOpacity onPress={handleFavorite} activeOpacity={1}>
						<FontAwesome name={'star-o'} color={'red'} size={20} />
					</TouchableOpacity>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ReposListItem;
