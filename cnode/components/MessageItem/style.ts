import { StyleSheet } from 'react-native';

import { FlexDirectionStyle, ShadowStyle } from 'cnode/styles/common';

const Style = StyleSheet.create({
	wrap: {
		backgroundColor: '#fff',
		margin: 5,
		padding: 10,
		...ShadowStyle,
		...FlexDirectionStyle,
		justifyContent: 'space-between',
	},
	author: {
		...FlexDirectionStyle,
		flex: 1,
	},
	avatar: {
		width: 30,
		height: 30,
		borderRadius: 4,
	},
	name: {
		fontSize: 16,
		marginLeft: 5,
	},
	replay: {
		...FlexDirectionStyle,
		flex: 1,
		justifyContent: 'flex-end',
	},
	topic: {
		color: '#08c',
	},
});

export default Style;
