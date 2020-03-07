import { StyleSheet } from 'react-native';

const CommonStyle = StyleSheet.create({
	item: {
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
});

export default CommonStyle;
