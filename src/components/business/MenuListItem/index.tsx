import React, { FC, ReactNode } from 'react';

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
	Icons: ReactNode;
	icon: string;
	title?: string;
	wrapStyle?: ViewStyle;
	iconStyle?: TextStyle;
	titleStyle?: TextStyle;
	leftStyle?: ViewStyle;
	arrowStyle?: TextStyle;
	hasBorder?: boolean;
	hasArrow?: boolean;
	onPress?: () => void;
};

const MenuListItem: FC<MenuListItemPropType> = props => {
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
	} = props;

	const Icons: any = props.Icons;

	const handlePressIcon = () => {
		onPress && onPress();
	};

	return (
		<TouchableOpacity onPress={handlePressIcon}>
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
					<IonIcons
						name="ios-arrow-forward"
						style={{ ...Style.arrow, ...arrowStyle }}
					/>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default MenuListItem;
