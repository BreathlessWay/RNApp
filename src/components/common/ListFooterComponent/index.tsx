import React, { FC } from 'react';

import { View, Text } from 'react-native';

import Style from './style';

export type EmptyComponentPropType = {
	loadMore: boolean;
	hasMore: boolean;
};

const ListFooterComponent: FC<EmptyComponentPropType> = props => {
	return (
		<View style={Style.wrap}>
			<Text style={Style.content}>
				{props.loadMore
					? '加载中...'
					: props.hasMore
					? '上拉加载更多'
					: '没有更多了'}
			</Text>
		</View>
	);
};

export default ListFooterComponent;
