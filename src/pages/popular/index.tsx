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

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { FileListType } from '@stores/popular/film';
import { EScreenName, RootStackParamList } from '@routes/route.d';

import { Store } from '@/stores';
import PopularStore from '@stores/popular';

import { request } from '@utils/request';

import Style from './style';
import { fetchData } from '@utils/dataStore';

export type PopularPagePropType = {
	popularStore: PopularStore;
	navigation: BottomTabNavigationProp<RootStackParamList, EScreenName.Popular>;
	route: RouteProp<RootStackParamList, EScreenName.Popular>;
};

const PopularPage: FC<PopularPagePropType> = props => {
	const [list, setList] = useState<FileListType>([]);

	const {
		route,
		navigation,
		popularStore: { loading, setLoading },
	} = props;

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		// `/search/repositories?q=${keyword}`
		try {
			setLoading(true);
			const data = await fetchData({
				url:
					'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json',
			});
			setList(data.movies);
		} catch (e) {
			console.error(e);
		} finally {
			setLoading(false);
		}
	};

	const handlePress = () => {
		navigation.jumpTo(EScreenName.PopularDetail);
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

const PopularScreen = (inject((store: Store) => ({
	popularStore: store.popularStore,
}))(observer(PopularPage)) as unknown) as FC;

export default PopularScreen;
