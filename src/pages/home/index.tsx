import React, { FC, useEffect, useState } from 'react';

import {
	FlatList,
	View,
	Text,
	Image,
	ActivityIndicator,
	Button,
} from 'react-native';
import { inject, observer } from 'mobx-react';

import { request } from '@utils/request';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { Store } from '@/stores';
import HomeStore from '@stores/home';
import { FileListType } from '@stores/home/film';
import { EScreenName, RootStackParamList } from '@/types/index.d.ts';

import Style from './style';

export type HomePagePropType = {
	homeStore: HomeStore;
	navigation: StackNavigationProp<RootStackParamList, EScreenName.Home>;
	route: RouteProp<RootStackParamList, EScreenName.Home>;
};

const HomePage: FC<HomePagePropType> = props => {
	const [list, setList] = useState<FileListType>([]);
	const {
		route,
		navigation,
		homeStore: { loading, setLoading },
	} = props;

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		try {
			setLoading(true);
			const data = await request({
				url: '/facebook/react-native/0.51-stable/docs/MoviesExample.json',
			});
			setList(data.movies);
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	};

	const handlePress = () => {
		navigation.navigate(EScreenName.User, {
			_id: 'user',
		});
	};

	return loading ? (
		<ActivityIndicator />
	) : (
		<FlatList
			style={Style.list}
			data={list}
			renderItem={({ item }) => (
				<View style={Style.item}>
					<Image source={{ uri: item.posters.thumbnail }} style={Style.image} />
					<View style={Style.intro}>
						<Text style={Style.title}>{item.title}</Text>
						<Text style={Style.year}>{item.year}</Text>
						<Button
							title={route.name + ' | ' + route.key}
							onPress={handlePress}
						/>
					</View>
				</View>
			)}
			// 用于为给定的item生成一个不重复的key
			keyExtractor={item => item.id}
		/>
	);
};

const HomeScreen = (inject((store: Store) => ({
	homeStore: store.homeStore,
}))(observer(HomePage)) as unknown) as FC;

export default HomeScreen;
