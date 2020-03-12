import React, { FC } from 'react';
import { inject, observer } from 'mobx-react';

import { View, Text } from 'react-native';

import { Store } from '@/stores';

import Style from './style';

const CustomEditPage = () => {
	return (
		<View>
			<Text>1</Text>
		</View>
	);
};

const CustomEditScreen = (inject((stores: Store) => ({
	a: stores.appStore,
}))(observer(CustomEditPage)) as unknown) as FC;

export default CustomEditScreen;
