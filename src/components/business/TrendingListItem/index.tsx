import React, { FC } from 'react';

import { useNavigation } from '@react-navigation/native';

import { View, Text, TouchableOpacity } from 'react-native';
import HTMLView from 'react-native-htmlview';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { StackNavigationProp } from '@react-navigation/stack';
import { EScreenName, RootStackParamList } from '@routes/route.d';
import { TrendingItemType } from '@stores/trend/trend';

import { EFavoriteTab } from '@config/constant';

import Style from './style';

export type TrendingListItemPropType = TrendingItemType & {
	isFavorite: boolean;
	onFavorite: (params: { item: TrendingItemType; isFavorite: boolean }) => void;
};

const TrendingListItem: FC<TrendingListItemPropType> = props => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	const { children, onFavorite, isFavorite, ...rest } = props;

	const handlePress = () => {
		navigation.navigate(EScreenName.Detail, {
			item: rest,
			source: EFavoriteTab.trending,
		});
	};

	const handleFavorite = () => {
		onFavorite({ item: rest, isFavorite: !isFavorite });
	};

	return (
		<TouchableOpacity onPress={handlePress}>
			<View style={Style.wrap}>
				<View style={Style.header}>
					<Text style={{ ...Style.name, ...{ color: props.color } }}>
						{props.full_name}
					</Text>
					<TouchableOpacity onPress={handleFavorite} activeOpacity={1}>
						<FontAwesome
							name={isFavorite ? 'star' : 'star-o'}
							color={'red'}
							size={20}
						/>
					</TouchableOpacity>
				</View>
				<View style={Style.tip}>
					{Boolean(props.language) && (
						<Text style={Style.language}>{props.language}</Text>
					)}
					<View style={Style.tagWrap}>
						<AntDesign name="star" color="#9E9E9E" size={14} />
						<Text style={Style.tagContent}>{props.stargazers_count}</Text>
					</View>
					<View style={Style.tagWrap}>
						<FontAwesome name="code-fork" color="#9E9E9E" size={14} />
						<Text style={Style.tagContent}>{props.forked}</Text>
					</View>
					<View style={Style.tagWrap}>
						<AntDesign name="star" color="#9E9E9E" size={14} />
						<Text style={Style.tagContent}>{props.todayStar}</Text>
					</View>
				</View>
				<HTMLView
					value={`<p>${props.description}</p>`}
					stylesheet={{
						p: Style.desc,
					}}
				/>
			</View>
		</TouchableOpacity>
	);
};

export default TrendingListItem;
