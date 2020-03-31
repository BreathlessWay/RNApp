import { StyleSheet, ViewStyle } from 'react-native';

import CommonStyle from 'trending/styles/common';

const baseWrap: ViewStyle = {
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
	paddingHorizontal: 10,
	paddingVertical: 20,
	backgroundColor: '#fff',
};

const Style = StyleSheet.create({
	wrap: baseWrap,
	wrapBorder: {
		...baseWrap,
		...CommonStyle.borderBottom,
	},
	left: { flexDirection: 'row', alignItems: 'center' },
	icon: {
		fontSize: 16,
		marginRight: 8,
	},
	title: {
		fontSize: 16,
	},
	arrow: {
		fontSize: 16,
	},
});

export default Style;
