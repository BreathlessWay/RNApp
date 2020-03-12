import { StyleSheet } from 'react-native';

const CommonStyle = StyleSheet.create({
	itemWrap: {
		backgroundColor: '#fff',
		padding: 10,
		marginHorizontal: 5,
		marginTop: 10,
		borderColor: '#ddd',
		borderWidth: 0.5,
		borderRadius: 2,
		// iOS阴影
		shadowColor: 'gray',
		shadowOffset: { width: 0.5, height: 0.5 },
		shadowOpacity: 0.4,
		shadowRadius: 1,
		// Android阴影
		elevation: 2,
	},
	tag: {
		backgroundColor: '#e2e2e2',
		paddingVertical: 2,
		paddingHorizontal: 4,
		marginRight: 5,
		borderRadius: 3,
		overflow: 'hidden',
	},
	indicator: {
		height: 2,
		backgroundColor: '#fff',
	},
	tabBarLabel: {
		fontSize: 13,
		marginHorizontal: 6,
		color: '#fff',
	},
	borderBottom: {
		borderBottomWidth: 0.5,
		borderColor: '#ccc',
		borderStyle: 'solid',
	},
});

export default CommonStyle;
