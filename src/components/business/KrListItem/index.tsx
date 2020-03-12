import React, { FC } from 'react';

import { useNavigation } from '@react-navigation/native';

import { View, Text, TouchableOpacity } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { EScreenName, RootStackParamList } from '@routes/route.d';
import { KrListItemType } from '@stores/trend/trend.d';

import Style from './style';

export type KrListItemPropType = KrListItemType;

const KrListItem: FC<KrListItemPropType> = props => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	const { children, ...rest } = props;

	const handlePress = () => {
		console.log(rest.news_url);
		navigation.navigate(EScreenName.WebView, {
			title: rest.title,
			url: rest.news_url,
		});
	};

	return (
		<TouchableOpacity onPress={handlePress}>
			<View style={Style.wrap}>
				<Text style={Style.title}>{props.title}</Text>
				<Text style={Style.desc}>{props.description}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default KrListItem;
