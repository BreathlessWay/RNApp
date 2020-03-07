import React, { FC } from 'react';

import { View } from 'react-native';
import { HeaderTitle } from '@react-navigation/stack';

export type CustomHeaderTitlePropType = {
	title: string;
};

export const CustomHeaderTitle: FC<CustomHeaderTitlePropType> = props => {
	const { title, children } = props;

	return title ? <HeaderTitle>{title}</HeaderTitle> : <View>{children}</View>;
};
