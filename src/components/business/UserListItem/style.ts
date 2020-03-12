import { StyleSheet } from 'react-native';
import CommonStyle from '@styles/common';

const Style = StyleSheet.create({
	wrap: {
		...CommonStyle.itemWrap,
		flexDirection: 'row',
	},
	img: {
		width: 60,
		height: 60,
		borderRadius: 2,
		marginRight: 5,
	},
	content: {
		flex: 1,
		justifyContent: 'space-around',
	},
	top: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	bottom: {
		flexDirection: 'row',
	},
	name: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	realName: {
		fontSize: 16,
		marginRight: 5,
		color: '#0366d6',
	},
	loginName: {
		fontStyle: 'italic',
		color: '#717171',
	},
	follow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	followCount: {
		color: '#9E9E9E',
		fontSize: 12,
		marginLeft: 2,
	},
	location: {
		flexDirection: 'row',
		marginRight: 10,
		alignItems: 'center',
	},
	repos: { flexDirection: 'row', alignItems: 'center' },
});

export default Style;
