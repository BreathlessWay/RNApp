import React, { FC } from 'react';

import { useNavigation } from '@react-navigation/native';

import { Image, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HTMLView from 'react-native-htmlview';

import { StackNavigationProp } from '@react-navigation/stack';
import { ReposItemType } from '@/types/repos.d';
import { EScreenName, RootStackParamList } from '@routes/route.d';

import { EFavoriteTab } from '@config/constant';

import Style from './style';

export type ReposListItemPropType = {
	isFavorite?: boolean;
	onFavorite?: (params: { item: ReposItemType; isFavorite: boolean }) => void;
	source: EFavoriteTab;
	showFavorite?: boolean;
	theme: string;
} & ReposItemType;

const ReposListItem: FC<ReposListItemPropType> = props => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	const {
		children,
		isFavorite,
		onFavorite,
		source,
		theme,
		showFavorite = true,
		...rest
	} = props;
	const handlePress = () => {
		navigation.navigate(EScreenName.Detail, {
			item: rest,
			source,
		});
	};

	const handleFavorite = () => {
		onFavorite && onFavorite({ item: rest, isFavorite: !isFavorite });
	};

	return (
		<TouchableOpacity onPress={handlePress}>
			<View style={Style.wrap}>
				<Text style={Style.title}>{props.full_name}</Text>
				<HTMLView
					value={`<p>${props.description}</p>`}
					stylesheet={{
						p: Style.desc,
					}}
				/>
				<View style={Style.footer}>
					<View style={Style.column}>
						<Text>Author:</Text>
						{props.owner && props.owner.avatar_url && (
							<Image
								source={{ uri: props.owner.avatar_url }}
								style={Style.avatar}
							/>
						)}
					</View>
					<View style={Style.column}>
						<Text>Stars:</Text>
						<Text>{props.stargazers_count}</Text>
					</View>
					{showFavorite && source === EFavoriteTab.popular && (
						<TouchableOpacity onPress={handleFavorite} activeOpacity={1}>
							<FontAwesome
								name={isFavorite ? 'star' : 'star-o'}
								color={theme}
								size={20}
							/>
						</TouchableOpacity>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ReposListItem;
