import { StyleSheet } from 'react-native';

import { FlexDirectionStyle } from 'cnode/styles/common';

import { THEME_COLOR } from 'cnode/config/constant';

const Style = StyleSheet.create({
	item: {
		marginVertical: 5,
		padding: 10,
		backgroundColor: '#fff',
	},
	top: {
		...FlexDirectionStyle,
		marginBottom: 20,
	},
	title: {
		flex: 1,
		fontSize: 18,
	},
	bottom: {
		...FlexDirectionStyle,
		justifyContent: 'space-between',
	},
	author: {
		...FlexDirectionStyle,
	},
	avatar: {
		width: 20,
		height: 20,
		borderRadius: 4,
	},
	name: {
		fontSize: 16,
		marginLeft: 5,
		color: '#666',
	},
	count: {
		fontSize: 12,
		color: '#ccc',
	},
});

export default Style;
