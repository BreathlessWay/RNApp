import React, { FC } from 'react';

import {
	View,
	TextStyle,
	TouchableOpacity,
	GestureResponderEvent,
	Text,
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/route.d';

import Style from './style';

export type CustomHeaderTitlePropType = {
	title: string;
	titleStyle?: TextStyle;
};

export const CustomHeaderTitle: FC<CustomHeaderTitlePropType> = props => {
	const { title, children, titleStyle } = props;

	let _style = Style.title as TextStyle;

	if (titleStyle) {
		_style = { ...Style.title, ...titleStyle };
	}

	return title ? (
		<View>
			<Text style={_style}>{title}</Text>
		</View>
	) : (
		<View>{children}</View>
	);
};

export const setHeader = ({
	navigation,
	title,
	left,
	right,
	header,
	titleStyle,
	handleLeftPress,
	handleRightPress,
}: {
	navigation: StackNavigationProp<RootStackParamList> | null;
	title?: string;
	left?: JSX.Element;
	right?: JSX.Element;
	header?: JSX.Element;
	titleStyle?: TextStyle;
	handleLeftPress?: (event: GestureResponderEvent) => void;
	handleRightPress?: (event: GestureResponderEvent) => void;
}) => {
	if (navigation) {
		navigation.setOptions({
			headerTitle: () =>
				title ? (
					<CustomHeaderTitle title={title} titleStyle={titleStyle} />
				) : (
					header
				),
			headerLeft: () =>
				left ? (
					<TouchableOpacity onPress={handleLeftPress}>
						<View>{left}</View>
					</TouchableOpacity>
				) : null,
			headerRight: () =>
				right ? (
					<TouchableOpacity onPress={handleRightPress}>
						<View>{right}</View>
					</TouchableOpacity>
				) : null,
		});
	}
};
