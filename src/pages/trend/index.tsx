import React, { FC, useEffect } from 'react';

import { View, Text, StatusBar } from 'react-native';
import { inject, observer } from 'mobx-react';
import { CustomHeaderTitle } from '@components/common/NavBarComponent';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Store } from '@/stores';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { EScreenName, RootStackParamList } from '@routes/route.d';

import Style from './style';

export type UserPagePropType = Pick<Store, 'appStore'>;

const UserPage: FC<UserPagePropType> = props => {
	const navigation = useNavigation<
		BottomTabNavigationProp<RootStackParamList, EScreenName.Trend>
	>();
	const route = useRoute<RouteProp<RootStackParamList, EScreenName.Trend>>();

	const setHeader = () => {
		props.appStore.stackNavigation?.setOptions({
			headerTitle: () => <CustomHeaderTitle title="趋势" />,
			headerLeft: () => null,
			headerRight: () => null,
		});
	};

	setHeader();

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			console.log('focus');
		});

		return unsubscribe;
	}, [navigation]);

	useEffect(() => {
		const unsubscribe = navigation.addListener('tabPress', e => {
			// e.preventDefault()
			setHeader();
		});

		return unsubscribe;
	}, [navigation]);

	const handlePress = () => {
		props.appStore.setTheme('#000');
	};

	return (
		<View>
			<Text onPress={handlePress}>修改主题色</Text>
		</View>
	);
};

const UserScreen = (inject((store: Store) => ({
	appStore: store.appStore,
}))(observer(UserPage)) as unknown) as FC;

export default UserScreen;
