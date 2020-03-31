import { StyleSheet } from 'react-native';
import CommonStyle from 'trending/styles/common';

export const actionWidth = 100;

const Style = StyleSheet.create({
	container: {
		flex: 1,
	},
	item: {
		flexDirection: 'row',
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 15,
		...CommonStyle.borderBottom,
	},
	text: {
		fontSize: 16,
	},
	tip: {
		fontSize: 12,
		color: '#999',
		marginLeft: 5,
	},
	//侧滑菜单的样式
	quickAContent: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	quick: {
		flex: 1,
		alignItems: 'center', //水平靠右
		justifyContent: 'center', //上下居中
		width: actionWidth,
	},
	delete: {
		color: '#fff',
	},
});

export default Style;
