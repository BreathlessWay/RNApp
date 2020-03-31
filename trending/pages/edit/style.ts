import { StyleSheet } from 'react-native';
import CommonStyle from 'trending/styles/common';

const Style = StyleSheet.create({
	save: {
		color: '#fff',
	},
	item: {
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		...CommonStyle.borderBottom,
	},
});

export default Style;
