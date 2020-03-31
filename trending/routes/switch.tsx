import React, { FC, useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import { useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import PopularTabRouteScreen from './popularTab';
import TrendTabRouteScreen from 'trending/routes/trendTab';
import FavoriteTabRouteScreen from 'trending/routes/favoriteTab';
import MeScreen from 'trending/pages/me';

import { Store } from 'trending/stores';

import { StackNavigationProp } from '@react-navigation/stack';
import { EScreenName, RootStackParamList } from './route.d';

// 当使用导航时自带了SafeAreaView
const { Navigator, Screen } = createMaterialBottomTabNavigator<
	RootStackParamList
>();

const IconSize = 22;

export type SwitchRoutePagePropType = Pick<Store, 'appStore'>;

const SwitchRoutePage: FC<SwitchRoutePagePropType> = (props) => {
	const { theme, setStackNavigation } = props.appStore;

	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	useEffect(() => {
		setStackNavigation(navigation);
	}, []);

	const screenList = [
		{
			name: EScreenName.Popular,
			component: PopularTabRouteScreen,
			title: '最热',
			tabBarColor: '#7f63ff',
			tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => (
				<MaterialIcon name="whatshot" color={color} size={IconSize} />
			),
		},
		{
			name: EScreenName.Trend,
			component: TrendTabRouteScreen,
			title: '趋势',
			tabBarColor: '#89ccba',
			tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => (
				<IonIcon name="md-trending-up" color={color} size={IconSize} />
			),
		},
		{
			name: EScreenName.Favorite,
			component: FavoriteTabRouteScreen,
			title: '收藏',
			tabBarColor: '#eeab62',
			tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => (
				<MaterialIcon name="favorite" color={color} size={IconSize} />
			),
		},
		{
			name: EScreenName.Me,
			component: MeScreen,
			title: '我',
			tabBarColor: '#f578ff',
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
			{screenList.map((item) => {
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

const SwitchRouteScreen = (inject((store: Store) => ({
	appStore: store.appStore,
}))(observer(SwitchRoutePage)) as unknown) as FC;

export default SwitchRouteScreen;
