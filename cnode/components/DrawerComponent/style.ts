import { StyleSheet } from 'react-native';
import { FlexDirectionStyle } from 'cnode/styles/common';

const Style = StyleSheet.create({
	login: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	loginTip: {
		fontSize: 20,
		marginTop: 20,
		color: '#333',
	},
	user: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10,
	},
	avatar: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
	name: {
		fontSize: 18,
		fontWeight: '500',
		marginVertical: 8,
		color: '#333',
	},
	info: {
		...FlexDirectionStyle,
	},
	time: {
		marginRight: 8,
		color: '#333',
	},
	score: {
		color: '#333',
	},
	item: {
		...FlexDirectionStyle,
	},
	icon: {
		width: 14,
	},
	label: {
		marginHorizontal: 4,
		color: '#333',
	},
	tip: {
		backgroundColor: 'red',
		width: 16,
		borderRadius: 7,
		color: '#fff',
		textAlign: 'center',
		overflow: 'hidden',
	},
});

export default Style;
