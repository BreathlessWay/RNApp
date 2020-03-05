import React, { FC } from 'react';

import { Text } from 'react-native';

import CommonSafeTopComponent from '@components/common/CommonSafeTopComponent';

import Style from './style';

const PopularPage: FC = props => {
	return (
		<CommonSafeTopComponent>
			<Text>PopularPage</Text>
		</CommonSafeTopComponent>
	);
};

const PopularScreen = (PopularPage as unknown) as FC;

export default PopularScreen;
