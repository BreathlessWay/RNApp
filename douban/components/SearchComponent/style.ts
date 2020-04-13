import { StyleSheet } from 'react-native';

import { FlexDirectionStyle, ShadowStyle } from 'douban/styles/common';

const Style = StyleSheet.create({
	wrap: {
		...ShadowStyle,
		padding: 8,
		backgroundColor: '#fff',
	},
	content: {
		...FlexDirectionStyle,
		borderRadius: 50,
		backgroundColor: '#eee',
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	input: {
		flex: 1,
		// TextInput在安卓上默认有一个底边框，同时会有一些padding。如果要想使其看起来和iOS上尽量一致，则需要设置padding: 0。
		borderWidth: 0,
		paddingHorizontal: 5,
	},
});

export default Style;
