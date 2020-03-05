import React, { FC } from 'react';

import { Text } from 'react-native';

import Style from './style';

const DetailPage: FC = props => {
	return <Text>DetailPage</Text>;
};

const DetailScreen = (DetailPage as unknown) as FC;

export default DetailScreen;
