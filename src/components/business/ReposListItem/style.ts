import { StyleSheet } from 'react-native';
import CommonStyle from '@styles/common';

const Style = StyleSheet.create({
	wrap: {
		...CommonStyle.item,
	},
	title: {
		fontSize: 16,
		marginBottom: 5,
		color: '#212121',
	},
	desc: {
		fontSize: 16,
		marginBottom: 10,
		color: '#757575',
	},
	footer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	avatar: {
		width: 22,
		height: 22,
		marginLeft: 5,
	},
	column: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});

export default Style;
