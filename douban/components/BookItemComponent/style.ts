import { Image, StyleSheet } from 'react-native';

import { FlexDirectionStyle, ShadowStyle } from 'douban/styles/common';

import { BORDER_WIDTH } from 'douban/config/constant';

const Style = StyleSheet.create({
	wrap: {
		...FlexDirectionStyle,
		alignItems: 'stretch',
		marginVertical: 5,
		borderColor: '#ccc',
		borderBottomWidth: BORDER_WIDTH,
		padding: 10,
	},
	image: {
		width: 80,
		height: 100,
	},
	content: {
		flex: 1,
		marginLeft: 10,
		justifyContent: 'space-around',
	},
	title: {
		fontSize: 20,
	},
	publisher: {
		fontSize: 13,
		color: '#a3a3a3',
	},
	author: {},
	bottom: {
		...FlexDirectionStyle,
	},
	price: {
		color: '#2bb2a3',
		fontSize: 14,
	},
	page: {
		marginLeft: 10,
		fontSize: 14,
		color: '#a7a0a0',
	},
});

export default Style;
