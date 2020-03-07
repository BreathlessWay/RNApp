import React, { FC, useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import { Text, View } from 'react-native';

import PopularScreen from '@pages/popular';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';

import { Store } from '@/stores';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { EScreenName, RootStackParamList } from '@routes/route.d';

import { TABS_LIST } from '@config/constant';
import { CustomHeaderTitle } from '@components/common/NavBarComponent';

const { Navigator, Screen } = createMaterialTopTabNavigator<
	RootStackParamList
>();

export type PopularTabRoutePagePropType = Pick<Store, 'appStore'>;

const PopularTabRoutePage: FC<PopularTabRoutePagePropType> = props => {
	const navigation = useNavigation<
		BottomTabNavigationProp<RootStackParamList>
	>();

	const setHeader = () => {
		props.appStore.stackNavigation?.setOptions({
			headerTitle: () => <CustomHeaderTitle title="最热" />,
			headerLeft: () => null,
			headerRight: () => null,
		});
	};

	setHeader();

	useEffect(() => {
		props.appStore.setSwitchNavigation(navigation);
	}, []);

	useEffect(() => {
		const unsubscribe = navigation.addListener('tabPress', e => {
			// e.preventDefault()
			setHeader();
		});
		return unsubscribe;
	}, [navigation]);

	return (
		<Navigator
			initialRouteName={TABS_LIST[0] as any}
			tabBarOptions={{
				scrollEnabled: true,
				style: {
					backgroundColor: '#678',
				},
				indicatorStyle: {
					height: 2,
					backgroundColor: '#fff',
				},
			}}
			lazy={true}>
			{TABS_LIST.map((tab, index) => (
				<Screen
					key={index}
					name={tab as any}
					children={props => <PopularScreen {...props} tab={tab} />}
					options={{
						tabBarLabel: () => (
							<Text
								style={{
									fontSize: 13,
									marginHorizontal: 6,
									color: '#fff',
								}}>
								{tab}
							</Text>
						),
					}}
				/>
			))}
		</Navigator>
	);
};

const PopularTabRouteScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
}))(observer(PopularTabRoutePage)) as unknown) as FC;

export default PopularTabRouteScreen;
