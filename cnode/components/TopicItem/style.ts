import { StyleSheet } from 'react-native';

import { FlexDirectionStyle, ShadowStyle } from 'cnode/styles/common';

const Style = StyleSheet.create({
	item: {
		marginVertical: 5,
		paddingHorizontal: 10,
		paddingVertical: 15,
		backgroundColor: '#fff',
		...ShadowStyle,
	},
	top: {
		...FlexDirectionStyle,
		marginBottom: 20,
	},
	title: {
		flex: 1,
		fontSize: 20,
		paddingRight: 5,
	},
	bottom: {
		...FlexDirectionStyle,
		justifyContent: 'space-between',
	},
	author: {
		...FlexDirectionStyle,
	},
	avatar: {
		width: 30,
		height: 30,
		borderRadius: 4,
	},
	name: {
		fontSize: 18,
		marginLeft: 10,
		color: '#666',
	},
	count: {
		fontSize: 14,
		color: '#999',
	},
	tip: {
		fontSize: 12,
		color: '#ccc',
	},
});

export default Style;
