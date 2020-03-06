import React, { FC } from 'react';

import { View, Text } from 'react-native';

import { PopularItemType } from '@stores/popular/popular';

const PopularListItem: FC<PopularItemType> = props => {
	return (
		<View>
			<Text>{props.name}</Text>
		</View>
	);
};

export default PopularListItem;
