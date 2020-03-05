import React, { FC, useEffect } from 'react';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import PopularTabRouteScreen from './popularTab';
import TrendScreen from '@pages/trend';
import FavoriteScreen from '@pages/favorite';
import MeScreen from '@pages/me';

import { useRoute } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { EScreenName, RootStackParamList } from './route.d';
import { RouteProp } from '@react-navigation/native';

// 当使用导航时自带了SafeAreaView
const { Navigator, Screen } = createMaterialBottomTabNavigator<
	RootStackParamList
>();

const IconSize = 22;

const SwitchRoutePage = () => {
	const route = useRoute<RouteProp<RootStackParamList, EScreenName.Switch>>();
	const { theme } = route.params;

	const screenList = [
		{
			name: EScreenName.Popular,
			component: PopularTabRouteScreen,
			title: '最热',
			tabBarColor: 'red',
			tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => (
				<MaterialIcon name="whatshot" color={color} size={IconSize} />
			),
		},
		{
			name: EScreenName.Trend,
			component: TrendScreen,
			title: '趋势',
			tabBarColor: 'blue',
			tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => (
				<IonIcon name="md-trending-up" color={color} size={IconSize} />
			),
		},
		{
			name: EScreenName.Favorite,
			component: FavoriteScreen,
			title: '收藏',
			tabBarColor: 'red',
			tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => (
				<MaterialIcon name="favorite" color={color} size={IconSize} />
			),
		},
		{
			name: EScreenName.Me,
			component: MeScreen,
			title: '我',
			tabBarColor: 'purple',
			tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => (
				<Entypo name="user" color={color} size={IconSize} />
			),
		},
	];

	return (
		<Navigator
			initialRouteName={EScreenName.Popular}
			// 针对选中的tab的label的显隐的配置
			labeled={true}
			// 针对所有tab是否显示label,以及切换tab动效
			// shifting={false}
			activeColor={theme}>
			{screenList.map(item => {
				return (
					<Screen
						key={item.name}
						name={item.name}
						component={item.component}
						options={{
							title: item.title,
							tabBarColor: item.tabBarColor,
							tabBarIcon: item.tabBarIcon,
						}}
					/>
				);
			})}
		</Navigator>
	);
};

const SwitchRouteScreen = (SwitchRoutePage as unknown) as FC;

export default SwitchRouteScreen;
