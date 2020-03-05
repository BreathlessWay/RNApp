import { StyleSheet, Platform, Dimensions } from 'react-native';

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
		// Screen and window dimensions are different on android
		// window: reports width/height without the soft menu bar
		// screen: reports entire screen's width/height
		width: Dimensions.get('window').width * 0.3,
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
