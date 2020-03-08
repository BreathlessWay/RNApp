import { Platform, StyleSheet } from 'react-native';

export const stickyHeaderHeight = Platform.select({
	ios: 86,
	android: 86,
});

const Style = StyleSheet.create({
	parallaxHeader: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'column',
		paddingTop: 120,
		paddingHorizontal: 20,
	},
	avatar: {
		marginBottom: 10,
		width: 80,
		height: 80,
	},
	sectionSpeakerText: {
		color: 'white',
		fontSize: 20,
		paddingVertical: 5,
		fontWeight: 'bold',
	},
	sectionTitleText: {
		color: 'white',
		fontSize: 16,
		paddingVertical: 5,
	},
	fixedSection: {
		position: 'absolute',
		paddingHorizontal: 10,
		bottom: 10,
		left: 0,
		right: 0,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	fixedSectionText: {
		color: '#999',
		fontSize: 16,
		textAlign: 'center',
	},
	stickySection: {
		height: stickyHeaderHeight,
		justifyContent: 'flex-end',
	},
	stickySectionText: {
		textAlign: 'center',
		color: 'white',
		fontSize: 18,
		marginVertical: 10,
	},
});

export default Style;
