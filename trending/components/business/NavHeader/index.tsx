import React, { FC } from 'react';

import {
	View,
	TextStyle,
	TouchableOpacity,
	GestureResponderEvent,
	Text,
	ViewStyle,
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'trending/routes/route.d';

import Style from './style';

export type CustomHeaderTitlePropType = {
	title: string;
	titleStyle?: TextStyle;
};

export const CustomHeaderTitle: FC<CustomHeaderTitlePropType> = (props) => {
	const { title, children, titleStyle } = props;

	let _style = Style.title as TextStyle;

	if (titleStyle) {
		_style = { ...Style.title, ...titleStyle };
	}

	return title ? (
		<View>
			<Text style={_style} ellipsizeMode="tail" numberOfLines={1}>
				{title}
			</Text>
		</View>
	) : (
		<View>{children}</View>
	);
};

export type setHeaderParams = {
	navigation: StackNavigationProp<RootStackParamList> | null;
	title?: string;
	left?: JSX.Element;
	right?: JSX.Element;
	header?: JSX.Element;
	onPressLeft?: (event: GestureResponderEvent) => void;
	onPressRight?: (event: GestureResponderEvent) => void;
	titleStyle?: TextStyle;
	leftStyle?: ViewStyle;
	rightStyle?: ViewStyle;
};

export const setHeader = ({
	navigation,
	title,
	left,
	right,
	header,
	onPressLeft,
	onPressRight,
	titleStyle,
	leftStyle,
	rightStyle,
}: setHeaderParams) => {
	let _leftStyle = Style.left as ViewStyle;

	if (leftStyle) {
		_leftStyle = { ...Style.left, ...leftStyle };
	}

	let _rightStyle = Style.right as ViewStyle;

	if (leftStyle) {
		_rightStyle = { ...Style.left, ...rightStyle };
	}

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
					<TouchableOpacity onPress={onPressLeft}>
						<View style={_leftStyle}>{left}</View>
					</TouchableOpacity>
				) : null,
			headerRight: () =>
				right ? (
					<TouchableOpacity onPress={onPressRight}>
						<View style={_rightStyle}>{right}</View>
					</TouchableOpacity>
				) : null,
		});
	}
};
