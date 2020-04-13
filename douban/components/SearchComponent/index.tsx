import React, { FC } from 'react';

import { View, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Style from './style';

export type BookSearchComponentPropType = {
	value: string;
	onChangeText: (text: string) => void;
	onSubmitEditing: () => void;
};

const BookSearchComponent: FC<BookSearchComponentPropType> = (props) => {
	const { value, onChangeText, onSubmitEditing } = props;

	return (
		<View style={Style.wrap}>
			<View style={Style.content}>
				<FontAwesome name={'search'} size={14} />
				<TextInput
					returnKeyType={'search'}
					placeholder={'请输入搜索关键词'}
					clearButtonMode={'while-editing'}
					style={Style.input}
					onChangeText={(text) => onChangeText(text)}
					value={value}
					onSubmitEditing={onSubmitEditing}
				/>
			</View>
		</View>
	);
};
export default BookSearchComponent;
