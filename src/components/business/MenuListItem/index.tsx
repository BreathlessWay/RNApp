import React, { FC, ReactNode, useState } from 'react';

import {
	TouchableOpacity,
	View,
	Text,
	TextStyle,
	ViewStyle,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';

import Style from './style';

export type MenuListItemPropType = {
	name: string;
	Icons?: ReactNode;
	icon?: string;
	title?: string;
	wrapStyle?: ViewStyle;
	iconStyle?: TextStyle;
	titleStyle?: TextStyle;
	leftStyle?: ViewStyle;
	arrowStyle?: TextStyle;
	hasBorder?: boolean;
	hasArrow?: boolean;
	onPress?: () => void;
	column?: boolean;
};

const MenuListItem: FC<MenuListItemPropType> = props => {
	const [upOrDown, setUpOrDown] = useState(false);

	const {
		name,
		icon,
		title,
		iconStyle = {},
		titleStyle = {},
		wrapStyle = {},
		leftStyle = {},
		arrowStyle = {},
		hasBorder = true,
		hasArrow = true,
		onPress,
		column = false,
	} = props;

	const Icons: any = props.Icons;

	const handlePressIcon = () => {
		if (column) {
			setUpOrDown(!upOrDown);
		}
		onPress && onPress();
	};

	let iconName = 'ios-arrow-forward';
	if (column) {
		iconName = upOrDown ? 'ios-arrow-up' : 'ios-arrow-down';
	}

	return (
		<TouchableOpacity
			onPress={handlePressIcon}
			activeOpacity={column ? 1 : 0.2}>
			<View
				style={
					hasBorder
						? { ...Style.wrapBorder, ...wrapStyle }
						: { ...Style.wrap, ...wrapStyle }
				}>
				<View style={{ ...Style.left, ...leftStyle }}>
					{Icons && icon && (
						<Icons name={icon} style={{ ...Style.icon, ...iconStyle }} />
					)}
					<Text style={{ ...Style.title, ...titleStyle }}>{title || name}</Text>
				</View>
				{hasArrow && (
					<IonIcons name={iconName} style={{ ...Style.arrow, ...arrowStyle }} />
				)}
			</View>
		</TouchableOpacity>
	);
};

export default MenuListItem;
