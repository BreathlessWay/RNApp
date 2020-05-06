import { StyleSheet } from 'react-native';

import { FlexDirectionStyle } from 'cnode/styles/common';

import { THEME_COLOR } from 'cnode/config/constant';

const Style = StyleSheet.create({
	tab: {
		padding: 3,
		backgroundColor: '#e5e5e5',
		color: '#666',
		borderRadius: 4,
		overflow: 'hidden',
		marginRight: 5,
		fontSize: 12,
	},
	good: {
		color: '#fff',
		backgroundColor: THEME_COLOR,
	},
	tabs: {
		...FlexDirectionStyle,
		justifyContent: 'center',
	},
});

export default Style;
