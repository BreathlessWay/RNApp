import { Dimensions, StyleSheet } from 'react-native';

import { FlexDirectionStyle } from 'douban/styles/common';

import { BORDER_WIDTH } from 'douban/config/constant';

const Style = StyleSheet.create({
	wrap: {
		alignItems: 'center',
		marginTop: 10,
		paddingVertical: 10,
		borderColor: '#ddd',
		borderTopWidth: BORDER_WIDTH,
		borderBottomWidth: BORDER_WIDTH,
	},
	image: {
		width: 70,
		height: 70,
		borderRadius: 35,
		marginBottom: 10,
	},
	row: {
		...FlexDirectionStyle,
		justifyContent: 'space-around',
		marginBottom: 10,
		width: Dimensions.get('window').width,
	},
	btn: {
		color: '#3082ff',
	},
});

export default Style;
