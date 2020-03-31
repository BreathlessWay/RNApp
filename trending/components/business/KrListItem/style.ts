import { StyleSheet } from 'react-native';
import CommonStyle from 'trending/styles/common';

const Style = StyleSheet.create({
	wrap: {
		...CommonStyle.itemWrap,
	},
	title: {
		fontSize: 16,
		marginRight: 5,
		color: '#0366d6',
		marginBottom: 5,
	},
	desc: {
		fontSize: 14,
		marginBottom: 10,
		color: '#757575',
	},
});

export default Style;
