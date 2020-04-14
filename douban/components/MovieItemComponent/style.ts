import { StyleSheet } from 'react-native';

import { FlexDirectionStyle } from 'douban/styles/common';

import { BORDER_WIDTH } from 'douban/config/constant';

const Style = StyleSheet.create({
	wrap: {
		...FlexDirectionStyle,
		padding: 10,
		borderBottomWidth: BORDER_WIDTH,
		borderColor: '#ccc',
	},
	image: {
		width: 100,
		height: 120,
		marginRight: 10,
	},
	content: {
		flex: 1,
	},
	title: {
		fontSize: 16,
		marginBottom: 5,
	},
	casts: {
		...FlexDirectionStyle,
		flexWrap: 'wrap',
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
	rate: {
		marginVertical: 5,
	},
	year: {
		marginBottom: 5,
	},
	genres: {
		...FlexDirectionStyle,
		flexWrap: 'wrap',
	},
});

export default Style;
