import React, { FC, useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import { Text, TouchableOpacity } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { CustomHeaderTitle } from '@components/common/NavBarComponent';

import { useNavigation } from '@react-navigation/native';

import { Store } from '@/stores';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { EScreenName, RootStackParamList } from '@routes/route.d';

import Style from './style';

export type MePagePropType = Pick<Store, 'appStore'>;

const MePage: FC<MePagePropType> = props => {
	const navigation = useNavigation<
		BottomTabNavigationProp<RootStackParamList, EScreenName.Me>
	>();

	const changeHeader = () => {
		props.appStore.stackNavigation?.setOptions({
			headerLeft: () => (
				<TouchableOpacity>
					<IonIcon name="ios-arrow-back" size={26} />
				</TouchableOpacity>
			),
			headerTitle: () => <CustomHeaderTitle title="我的" />,
			headerRight: () => (
				<TouchableOpacity>
					<Feather name="search" size={22} />
				</TouchableOpacity>
			),
		});
	};

	changeHeader();

	useEffect(() => {}, []);

	useEffect(() => {
		const unsubscribe = navigation.addListener('tabPress', e => {
			changeHeader();
		});

		return unsubscribe;
	}, [navigation]);

	return <Text>MePage</Text>;
};

const MeScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
}))(observer(MePage)) as unknown) as FC;

export default MeScreen;
