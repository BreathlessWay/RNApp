import React, { useContext, useEffect } from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import BookPage from 'douban/pages/BookPage';
import MusicPage from 'douban/pages/MusicPage';
import MoviePage from 'douban/pages/MoviePage';

import { DouBanContext } from 'douban/stores';

import { StackNavigationProp } from '@react-navigation/stack';
import { EScreenName, RootStackParamList } from 'douban/routes/type';

import { TAR_BAR_ICON_SIZE } from 'douban/config/constant';
import { ActionType } from 'douban/stores/reducer/type';
import { Text } from 'react-native';

const { Screen, Navigator } = createMaterialBottomTabNavigator();

const TabRouter = () => {
	const stackNavigation = useNavigation<
			StackNavigationProp<RootStackParamList>
		>(),
		route = useRoute<RouteProp<RootStackParamList, EScreenName.Home>>(),
		{ dispatch } = useContext(DouBanContext);

	const screenList = [
		{
			name: EScreenName.Book,
			component: BookPage,
			title: '图书',
			tabBarColor: '#7f63ff',
			tabBarIcon: ({ color }: { focused: boolean; color: string }) => (
				<AntDesign name="book" color={color} size={TAR_BAR_ICON_SIZE} />
			),
		},
		{
			name: EScreenName.Music,
			component: MusicPage,
			title: '音乐',
			tabBarColor: '#89ccba',
			tabBarIcon: ({ color }: { focused: boolean; color: string }) => (
				<Feather name="music" color={color} size={TAR_BAR_ICON_SIZE} />
			),
		},
		{
			name: EScreenName.Movie,
			component: MoviePage,
			title: '电影',
			tabBarColor: '#eeab62',
			tabBarIcon: ({ color }: { focused: boolean; color: string }) => (
				<SimpleLineIcons name="film" color={color} size={TAR_BAR_ICON_SIZE} />
			),
		},
	];

	useEffect(() => {
		dispatch({
			type: ActionType.SET_STACK_NAVIGATION,
			payload: { stackNavigation },
		});
		stackNavigation.setOptions({
			title: route.params?.title ?? '主页',
		});
	}, []);

	return (
		<Navigator
			initialRouteName={EScreenName.Book}
			// 针对选中的tab的label的显隐的配置
			labeled={true}
			// 针对所有tab是否显示label,以及切换tab动效
			// 默认3个以上的tab才是true
			shifting={true}>
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
						listeners={{
							tabPress: () => {
								item.name !== EScreenName.Movie &&
									stackNavigation.setOptions({
										headerTitle: (props) => (
											<Text
												style={{
													color: props.tintColor,
													fontSize: 17,
													fontWeight: '600',
												}}
												numberOfLines={1}>
												{item.title}
											</Text>
										),
									});
							},
						}}
					/>
				);
			})}
		</Navigator>
	);
};

export default TabRouter;
