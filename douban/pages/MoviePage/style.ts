import { StyleSheet } from 'react-native';

import { FlexDirectionStyle, ShadowStyle } from 'douban/styles/common';

const Style = StyleSheet.create({
	wrap: {
		flex: 1,
		position: 'relative',
	},
	cityColumn: {
		...FlexDirectionStyle,
		...ShadowStyle,
		backgroundColor: '#efefef',
		padding: 10,
	},
	currentCity: {},
	mask: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: 'rgba(0,0,0,0.4)',
	},
	cityList: {
		position: 'absolute',
		top: 24,
		left: 5,
		alignItems: 'center',
	},
	cityItem: {
		paddingHorizontal: 10,
		paddingVertical: 8,
		backgroundColor: '#fff',
	},
	cityItemChecked: {
		backgroundColor: '#ccc',
	},
	icon: {
		marginBottom: -7,
	},
});

export default Style;
