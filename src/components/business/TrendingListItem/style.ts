import { StyleSheet } from 'react-native';
import CommonStyle from '@styles/common';

const Style = StyleSheet.create({
	wrap: {
		...CommonStyle.item,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	name: {
		fontSize: 18,
	},
	tip: {
		flexDirection: 'row',
		marginVertical: 5,
		alignItems: 'center',
	},
	language: {
		color: '#545454',
		fontSize: 12,
		...CommonStyle.tag,
	},
	tagWrap: {
		flexDirection: 'row',
		alignItems: 'center',
		...CommonStyle.tag,
	},
	tagContent: {
		fontSize: 12,
		marginLeft: 2,
		color: '#545454',
	},
	desc: {
		fontSize: 14,
		marginBottom: 10,
		color: '#757575',
	},
});

export default Style;
