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
		width: 80,
		height: 100,
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
		backgroundColor: '#e1e1e1',
		paddingVertical: 2,
		paddingHorizontal: 4,
		borderRadius: 5,
		overflow: 'hidden',
		marginRight: 6,
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
	},
});

export default Style;
