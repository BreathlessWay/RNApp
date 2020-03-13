import { Dimensions, StyleSheet } from 'react-native';
import CommonStyle from '@styles/common';

const Style = StyleSheet.create({
	wrap: { flex: 1 },
	input: {
		width: Dimensions.get('window').width / 2,
		color: '#fff',
		paddingHorizontal: 5,
	},
	btn: {
		color: '#fff',
	},
	search: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 5,
		...CommonStyle.borderBottom,
	},
	add: {
		width: Dimensions.get('window').width / 2,
		margin: 'auto',
		position: 'absolute',
		bottom: 40,
		transform: [{ translateX: Dimensions.get('window').width / 4 }],
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	addWrap: {},
	addName: {
		textAlign: 'center',
		color: '#fff',
		paddingVertical: 10,
	},
	loading: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Style;
