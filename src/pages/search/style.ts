import { Dimensions, StyleSheet } from 'react-native';
import CommonStyle from '@styles/common';

const Style = StyleSheet.create({
	input: {
		width: Dimensions.get('window').width / 2,
		color: '#fff',
		paddingHorizontal: 5,
	},
	btn: {
		color: '#fff',
	},
	search: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 5,
		...CommonStyle.borderBottom,
	},
});

export default Style;
