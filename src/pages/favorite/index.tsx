import React, { FC } from 'react';

import { Text } from 'react-native';

import CommonSafeTopComponent from '@components/common/CommonSafeTopComponent';

import Style from './style';

const FavoritePage: FC = props => {
	return (
		<CommonSafeTopComponent>
			<Text>FavoritePage</Text>
		</CommonSafeTopComponent>
	);
};

const FavoriteScreen = (FavoritePage as unknown) as FC;

export default FavoriteScreen;
