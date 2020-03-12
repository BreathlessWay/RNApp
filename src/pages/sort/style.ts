import { StyleSheet } from 'react-native';
import CommonStyle from '@styles/common';

const Style = StyleSheet.create({
	save: {
		color: '#fff',
	},
	item: {
		paddingHorizontal: 10,
		paddingVertical: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		...CommonStyle.borderBottom,
	},
});

export default Style;
