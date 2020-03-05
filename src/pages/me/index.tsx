import React, { FC } from 'react';

import { Text } from 'react-native';

import CommonSafeTopComponent from '@components/common/CommonSafeTopComponent';

import Style from './style';

const MePage: FC = props => {
	return (
		<CommonSafeTopComponent>
			<Text>MePage</Text>
		</CommonSafeTopComponent>
	);
};

const MeScreen = (MePage as unknown) as FC;

export default MeScreen;
