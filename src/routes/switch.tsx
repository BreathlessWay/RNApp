import React, { FC } from 'react';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import PopularTabRouteScreen from './popularTab';
import TrendScreen from '@pages/trend';
import FavoriteScreen from '@pages/favorite';
import MeScreen from '@pages/me';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { EScreenName, RootStackParamList } from './route.d';

// 当使用导航时自带了SafeAreaView
const { Navigator, Screen } = createMaterialBottomTabNavigator<
	RootStackParamList
>();

const IconSize = 22;

const SwitchRoutePage = () => {
	return (
		<Navigator
			initialRouteName={EScreenName.Popular}
			// 针对选中的tab的label的显隐的配置
			labeled={true}
			// 针对所有tab是否显示label,以及切换tab动效
			// shifting={false}
		>
			<Screen
				name={EScreenName.Popular}
				component={PopularTabRouteScreen}
				options={{
					title: '最热',
					tabBarColor: 'red',
					tabBarIcon: ({ focused, color }) => (
						<MaterialIcon name="whatshot" color={color} size={IconSize} />
					),
				}}
			/>
			<Screen
				name={EScreenName.Trend}
				component={TrendScreen}
				options={{
					title: '趋势',
					tabBarColor: 'blue',
					tabBarIcon: ({ focused, color }) => (
						<IonIcon name="md-trending-up" color={color} size={IconSize} />
					),
				}}
			/>
			<Screen
				name={EScreenName.Favorite}
				component={FavoriteScreen}
				options={{
					title: '收藏',
					tabBarColor: 'orange',
					tabBarIcon: ({ focused, color }) => (
						<MaterialIcon name="favorite" color={color} size={IconSize} />
					),
				}}
			/>
			<Screen
				name={EScreenName.Me}
				component={MeScreen}
				options={{
					title: '我',
					tabBarColor: 'purple',
					tabBarIcon: ({ focused, color }) => (
						<Entypo name="user" color={color} size={IconSize} />
					),
				}}
			/>
		</Navigator>
	);
};

const SwitchRouteScreen = (SwitchRoutePage as unknown) as FC;

export default SwitchRouteScreen;
