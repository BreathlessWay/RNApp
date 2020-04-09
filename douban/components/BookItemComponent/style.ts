import { Image, StyleSheet } from 'react-native';

import { FlexDirectionStyle, ShadowStyle } from 'douban/styles/common';

import { BORDER_WIDTH } from 'douban/config/constant';

const Style = StyleSheet.create({
	wrap: {
		...ShadowStyle,
		...FlexDirectionStyle,
		marginVertical: 5,
		borderColor: '#ccc',
		borderBottomWidth: BORDER_WIDTH,
	},
	image: {
		width: 80,
		height: 100,
	},
	content: {
		flex: 1,
		marginLeft: 10,
	},
	title: {
		fontSize: 28,
	},
	publisher: {
		fontSize: 13,
		color: '#a3a3a3',
	},
	author: {},
	price: {
		color: '#2bb2a3',
		fontSize: 16,
	},
	page: {
		marginLeft: 10,
		color: '#a7a0a0',
	},
});

export default Style;
