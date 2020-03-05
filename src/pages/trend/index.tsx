import React, { FC, useEffect } from 'react';

import { View, Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Store } from '@/stores';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { EScreenName, RootStackParamList } from '@routes/route.d';

import Style from './style';

export type UserPagePropType = {};

const UserPage: FC<UserPagePropType> = () => {
	const navigation = useNavigation<
		StackNavigationProp<RootStackParamList, EScreenName.Trend>
	>();
	const route = useRoute<RouteProp<RootStackParamList, EScreenName.Trend>>();

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			console.log('focus');
			// Screen was focused
			// Do something
		});

		return unsubscribe;
	}, [navigation]);

	return (
		<SafeAreaView>
			<View>
				<Text>User页面</Text>
			</View>
		</SafeAreaView>
	);
};

const UserScreen = (inject((store: Store) => store)(
	observer(UserPage),
) as unknown) as FC;

export default UserScreen;
