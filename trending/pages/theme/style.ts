import { StyleSheet } from 'react-native';
import CommonStyle from 'trending/styles/common';

const Style = StyleSheet.create({
	wrap: {
		padding: 10,
		marginBottom: 30,
	},
	item: {
		position: 'relative',
		marginBottom: 10,
		padding: 40,
		borderRadius: 4,
		...CommonStyle.shadow,
	},
	name: {
		fontSize: 20,
		color: '#fff',
		textAlign: 'center',
	},
	icon: {
		position: 'absolute',
		top: 10,
		right: 10,
	},
});

export default Style;
