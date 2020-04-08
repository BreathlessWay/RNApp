import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import BookPage from 'douban/pages/BookPage';

import { EScreenName } from 'douban/routes/type';

const { Screen, Navigator } = createMaterialBottomTabNavigator();

const IconSize = 22;

const TabRouter = () => {
	const screenList = [
		{
			name: EScreenName.Book,
			component: BookPage,
			title: '图书',
			tabBarColor: '#7f63ff',
			tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => (
				<AntDesign name="book" color={color} size={IconSize} />
			),
		},
		{
			name: EScreenName.Music,
			component: BookPage,
			title: '音乐',
			tabBarColor: '#89ccba',
			tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => (
				<Feather name="music" color={color} size={IconSize} />
			),
		},
		{
			name: EScreenName.Movie,
			component: BookPage,
			title: '电影',
			tabBarColor: '#eeab62',
			tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => (
				<SimpleLineIcons name="film" color={color} size={IconSize} />
			),
		},
		{
			name: EScreenName.About,
			component: BookPage,
			title: '关于',
			tabBarColor: '#85bfee',
			tabBarIcon: ({ focused, color }: { focused: boolean; color: string }) => (
				<AntDesign name="profile" color={color} size={IconSize} />
			),
		},
	];

	return (
		<Navigator
			initialRouteName={EScreenName.Book}
			// 针对选中的tab的label的显隐的配置
			labeled={true}
			// 针对所有tab是否显示label,以及切换tab动效
			// shifting={false}
		>
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

export default TabRouter;
