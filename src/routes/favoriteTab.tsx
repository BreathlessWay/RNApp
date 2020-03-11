import React, { FC, useCallback, useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Text } from 'react-native';

import FavoriteScreen from '@pages/favorite';

import { setHeader, setHeaderParams } from '@components/business/NavHeader';

import { Store } from '@/stores';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '@routes/route.d';

import { FAVORITE_TABS_LIST } from '@config/constant';

import CommonStyle from '@styles/common';

const { Navigator, Screen } = createMaterialTopTabNavigator<
	RootStackParamList
>();

export type FavoriteTabRoutePagePropType = Pick<
	Store,
	'appStore' | 'favoriteStore'
>;

const FavoriteTabRoutePage: FC<FavoriteTabRoutePagePropType> = props => {
	const navigation = useNavigation<
		BottomTabNavigationProp<RootStackParamList>
	>();

	const {
		appStore: { stackNavigation, setFavoriteSwitchNavigation , theme},
	} = props;

	const headerOptions: setHeaderParams = {
		navigation: stackNavigation,
		title: '收藏',
	};

	useEffect(() => {
		setFavoriteSwitchNavigation(navigation);
	}, []);

	useFocusEffect(
		useCallback(() => {
			setHeader(headerOptions);
		}, [stackNavigation]),
	);

	return (
		<Navigator
			initialRouteName={FAVORITE_TABS_LIST[0]?.key as any}
			tabBarOptions={{
				style: {
					backgroundColor: theme,
				},
				indicatorStyle: CommonStyle.indicator,
			}}
			lazy={true}>
			{FAVORITE_TABS_LIST.map((tab, index) => (
				<Screen
					key={index}
					name={tab.key as any}
					children={props => <FavoriteScreen {...props} tab={tab.key} />}
					options={{
						tabBarLabel: () => (
							<Text style={CommonStyle.tabBarLabel}>{tab.title}</Text>
						),
					}}
				/>
			))}
		</Navigator>
	);
};

const FavoriteTabRouteScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
	favoriteStore: stores.favoriteStore,
}))(observer(FavoriteTabRoutePage)) as unknown) as FC;

export default FavoriteTabRouteScreen;
