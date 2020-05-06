import { Dimensions, StyleSheet } from 'react-native';

import { FlexDirectionStyle } from 'cnode/styles/common';

const Style = StyleSheet.create({
	headerTitle: {
		fontSize: 18,
		color: '#fff',
		paddingHorizontal: 10,
		fontWeight: 'bold',
	},
	header: {
		backgroundColor: '#fff',
		paddingHorizontal: 10,
		marginBottom: 10,
	},
	title: {
		fontSize: 18,
		paddingTop: 20,
		paddingBottom: 10,
		textAlign: 'center',
		lineHeight: 26,
	},
	info: {
		...FlexDirectionStyle,
		justifyContent: 'center',
		paddingVertical: 10,
	},
	name: {
		fontSize: 14,
		marginHorizontal: 5,
		color: '#333',
	},
	time: {
		fontSize: 14,
		marginHorizontal: 5,
		color: '#333',
	},
	content: {
		padding: 10,
		backgroundColor: '#fff',
	},
	image: {
		width: Dimensions.get('window').width - 20,
		height: Dimensions.get('window').width,
	},
});

export default Style;
