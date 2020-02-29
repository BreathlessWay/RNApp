import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
	list: {
		paddingHorizontal: 10,
		paddingVertical: 20,
	},
	item: {
		flexDirection: 'row',
		marginBottom: 20,
	},
	image: {
		width: 53,
		height: Platform.OS === 'ios' ? 81 : 53,
	},
	intro: {
		paddingLeft: 10,
		flex: 1,
		...Platform.select({
			ios: {
				justifyContent: 'flex-start',
			},
			android: {
				justifyContent: 'space-around',
			},
		}),
	},
	title: {
		fontSize: 20,
	},
	year: {
		fontSize: 15,
	},
});
