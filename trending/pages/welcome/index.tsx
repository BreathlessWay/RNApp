import React, { FC, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import { View, Text } from 'react-native';

import { EScreenName, RootStackParamList } from 'trending/routes/route.d';
import { StackNavigationProp } from '@react-navigation/stack';

import Style from './style';

export type WelcomePagePropType = {};

const WelcomePage: FC<WelcomePagePropType> = () => {
	const navigation = useNavigation<
		StackNavigationProp<RootStackParamList, EScreenName.Welcome>
	>();

	useEffect(() => {
		const time = setTimeout(() => {
			navigation.replace(EScreenName.Switch);
		}, 3000);
		return () => {
			clearTimeout(time);
		};
	}, []);

	return (
		<View style={Style.wrap}>
			<Text style={Style.content}>RN-GitHub</Text>
		</View>
	);
};

const WelcomeScreen = (WelcomePage as unknown) as FC;

export default WelcomeScreen;
