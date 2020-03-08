import { StyleSheet, ViewStyle } from 'react-native';

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
		borderBottomWidth: 0.5,
		borderColor: '#ccc',
		borderStyle: 'solid',
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
