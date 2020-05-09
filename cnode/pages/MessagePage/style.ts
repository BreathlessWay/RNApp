import { Dimensions, StyleSheet } from 'react-native';

const Style = StyleSheet.create({
	wrap: {
		flex: 1,
	},
	emptyWrap: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	emptyContent: {
		fontSize: 30,
		color: '#999',
		paddingTop: 200,
	},
	fab: {
		position: 'absolute',
		bottom: Dimensions.get('window').height / 2,
		right: 0,
		backgroundColor: 'rgba(0,0,0,0.3)',
		padding: 8,
		textAlign: 'center',
	},
	fabContent: {
		fontSize: 12,
		lineHeight: 15,
		color: '#fff',
	},
});

export default Style;
