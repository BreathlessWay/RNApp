import { Dimensions, StyleSheet } from 'react-native';
import CommonStyle from '@styles/common';

export const itemWidth = Dimensions.get('window').width;

export const itemHeight = 60;

const Style = StyleSheet.create({
	save: {
		color: '#fff',
	},
	item: {
		width: itemWidth,
		height: itemHeight,
		paddingHorizontal: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		...CommonStyle.borderBottom,
	},
});

export default Style;
