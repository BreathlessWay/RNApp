import { StyleSheet } from 'react-native';
import { FlexDirectionStyle } from 'douban/styles/common';
import { BORDER_WIDTH } from 'douban/config/constant';

const Style = StyleSheet.create({
	wrap: {
		backgroundColor: '#fff',
	},
	content: {
		padding: 10,
	},
	date: {
		fontSize: 16,
		marginBottom: 10,
	},
	rate: {
		fontSize: 16,
		marginBottom: 10,
	},
	tags: {
		...FlexDirectionStyle,
		flexWrap: 'wrap',
		marginBottom: 5,
	},
	tag: {
		fontSize: 12,
		backgroundColor: '#eee',
		overflow: 'hidden',
		paddingVertical: 5,
		paddingHorizontal: 8,
		borderRadius: 10,
		marginRight: 10,
		marginBottom: 5,
	},
	detail: {
		fontSize: 16,
		lineHeight: 30,
	},
	line: {
		borderBottomWidth: BORDER_WIDTH,
		borderColor: '#ccc',
		marginVertical: 5,
	},
});

export default Style;
