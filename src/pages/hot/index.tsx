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

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

import { Store } from '@/stores';
import HotStore from '@stores/hot';
import { FileListType } from '@stores/hot/film';
import { EScreenName, RootStackParamList } from '@routes/route.d';

import Style from './style';

export type HotPagePropType = {
	hotStore: HotStore;
	navigation: BottomTabNavigationProp<RootStackParamList, EScreenName.Hot>;
	route: RouteProp<RootStackParamList, EScreenName.Hot>;
};

const HotPage: FC<HotPagePropType> = props => {
	const [list, setList] = useState<FileListType>([]);
	const {
		route,
		navigation,
		hotStore: { loading, setLoading },
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
		navigation.jumpTo(EScreenName.Trend, {
			_id: 'user',
		});
	};

	return (
		<View>
			{loading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					style={Style.list}
					data={list}
					renderItem={({ item }) => (
						<View style={Style.item}>
							<Image
								source={{ uri: item.posters.thumbnail }}
								style={Style.image}
							/>
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
			)}
		</View>
	);
};

const HotScreen = (inject((store: Store) => ({
	hotStore: store.hotStore,
}))(observer(HotPage)) as unknown) as FC;

export default HotScreen;
