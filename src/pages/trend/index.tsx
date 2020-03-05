import React, { FC, useEffect } from 'react';

import { View, Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import CommonSafeTopComponent from '@components/common/CommonSafeTopComponent';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Store } from '@/stores';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { EScreenName, RootStackParamList } from '@routes/route.d';

import Style from './style';

export type UserPagePropType = {};

const UserPage: FC<UserPagePropType> = () => {
	const navigation = useNavigation<
		BottomTabNavigationProp<RootStackParamList, EScreenName.Trend>
	>();
	const route = useRoute<RouteProp<RootStackParamList, EScreenName.Trend>>();

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			console.log('focus');
		});

		return unsubscribe;
	}, [navigation]);

	useEffect(() => {
		const unsubscribe = navigation.addListener('tabPress', e => {
			// e.preventDefault()
			console.log(e);
		});

		return unsubscribe;
	}, [navigation]);

	const handlePress = () => {};

	return (
		<CommonSafeTopComponent>
			<View>
				<Text onPress={handlePress}>修改主题色</Text>
			</View>
		</CommonSafeTopComponent>
	);
};

const UserScreen = (inject((store: Store) => store)(
	observer(UserPage),
) as unknown) as FC;

export default UserScreen;
