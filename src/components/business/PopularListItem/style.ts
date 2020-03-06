import { StyleSheet } from 'react-native';

const Style = StyleSheet.create({
	wrap: {
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
	title: {
		fontSize: 16,
		marginBottom: 5,
		color: '#212121',
	},
	desc: {
		fontSize: 16,
		marginBottom: 10,
		color: '#757575',
	},
	footer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	avatar: {
		width: 22,
		height: 22,
		marginLeft: 5,
	},
	column: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});

export default Style;
