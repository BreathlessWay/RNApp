import React, { FC } from 'react';

import { View, Text } from 'react-native';

import Style from './style';

export type EmptyComponentPropType = {
	msg?: string;
};

const EmptyComponent: FC<EmptyComponentPropType> = (props) => {
	return (
		<View style={Style.wrap}>
			<Text style={Style.content}>{props.msg || '暂无数据'}</Text>
		</View>
	);
};

export default EmptyComponent;
