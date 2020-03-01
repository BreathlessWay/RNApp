import React, { FC, useEffect } from 'react';

import { View, Text, TouchableHighlight, Button } from 'react-native';
import { inject, observer } from 'mobx-react';

import { request } from '@utils/request';

import { Store } from '@/stores';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { EScreenName, RootStackParamList } from '@/types/index.d';

import Style from './style';

export type UserPagePropType = {
	navigation: StackNavigationProp<RootStackParamList, EScreenName.User>;
	route: RouteProp<RootStackParamList, EScreenName.User>;
};

const UserPage: FC<UserPagePropType> = props => {
	const { navigation, route } = props;

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			console.log('focus');
			// Screen was focused
			// Do something
		});

		return unsubscribe;
	}, [navigation]);

	return (
		<View>
			<TouchableHighlight onPress={() => navigation.push(EScreenName.User)}>
				<View>
					<Text>User页面</Text>
					<Text>{route.params._id}</Text>
				</View>
			</TouchableHighlight>
			<Button onPress={() => navigation.popToTop()} title="回首页" />
			<Button
				title="Update the title"
				onPress={() => navigation.setOptions({ title: 'Updated!' })}
			/>
		</View>
	);
};

const UserScreen = (inject((store: Store) => store)(
	observer(UserPage),
) as unknown) as FC;

export default UserScreen;
