import { StyleSheet } from 'react-native';

const Style = StyleSheet.create({
	btn: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	label: {
		backgroundColor: '#e1e1e1',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
	},
	show: {
		fontSize: 14,
		color: '#333',
	},
	icon: {
		marginVertical: -15,
	},
	content: {
		position: 'absolute',
		top: 165,
		left: 10,
	},
	list: {
		backgroundColor: '#fff',
		borderRadius: 3,
		paddingVertical: 5,
	},
	item: {
		fontSize: 16,
		textAlign: 'center',
		paddingVertical: 8,
		paddingHorizontal: 20,
	},
});

export default Style;
