import React, { FC, useEffect, useState } from 'react';

import { FlatList, View, Text, Image, ActivityIndicator } from 'react-native';
import { inject, observer } from 'mobx-react';

import { request } from '@utils/request';

import { Store } from '@/stores';
import HomeStore from '@stores/home';
import { FileListType } from '@stores/home/film';

import Style from './style';

export type HomePagePropType = {
	homeStore: HomeStore;
};

const HomePage: FC<HomePagePropType> = props => {
	const [list, setList] = useState<FileListType>([]);
	const { loading, setLoading } = props.homeStore;

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

	useEffect(() => {
		getData();
	}, []);

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
					</View>
				</View>
			)}
			// 用于为给定的item生成一个不重复的key
			keyExtractor={item => item.id}
		/>
	);
};

export default (inject((store: Store) => ({
	homeStore: store.homeStore,
}))(observer(HomePage)) as unknown) as FC;
