import React, { FC, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { Alert, View, Text } from 'react-native';
import CommonFlatList from 'douban/components/CommonFlatList';

import { useGetList } from 'douban/services/getList';

import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { EScreenName, RootStackParamList } from 'douban/routes/type';
import { MovieItemType, MovieStateType } from 'douban/stores/state/movie/type';

import Style from './style';

const MoviePage: FC = () => {
	const [keyword, setKeyword] = useState<string>('');

	const tabNavigation = useNavigation<
		MaterialBottomTabNavigationProp<RootStackParamList>
	>();

	const [state, setList] = useGetList<
		MovieStateType,
		{ params: { q?: string; start?: number } }
	>({
		url: '/movie/top250',
		key: 'movie',
	});

	const {
		list,
		refreshing,
		params: { start, count },
		empty,
		loadMore,
		hasMore,
	} = state;

	useEffect(() => {
		setKeyword('javascript');
		setList({ params: { q: 'javascript' }, refreshing: true });
	}, []);

	const handlePress = (item: MovieItemType) => {
		tabNavigation.navigate(EScreenName.WebView, {
			title: item.title,
			url: item.alt,
		});
	};

	const handleChangeText = (text: string) => {
		setKeyword(text);
	};

	const handleSubmit = () => {
		if (keyword && keyword.trim()) {
			setList({ params: { q: keyword, start: 0 }, refreshing: true });
		} else {
			Alert.alert('请输入关键词', '', [{ text: '确定' }]);
		}
	};

	return (
		<View style={Style.wrap}>
			<View>
				<Text>当前热映</Text>
				<Text>TOP250</Text>
			</View>
			<CommonFlatList
				data={list}
				empty={empty}
				loadMore={loadMore}
				hasMore={hasMore}
				refreshing={refreshing}
				onEndReached={() =>
					setList({
						params: { start: start + count },
						loadMore: true,
					})
				}
				onRefresh={() =>
					setList({
						params: { start: 0 },
						refreshing: true,
					})
				}
				renderItem={({ item }) => {
					return <View></View>;
				}}
			/>
		</View>
	);
};

export default MoviePage;
