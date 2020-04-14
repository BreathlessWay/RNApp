import React, { FC, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { Text, View } from 'react-native';
import CommonFlatList from 'douban/components/CommonFlatList';

import { useGetList } from 'douban/services/getList';

import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { EScreenName, RootStackParamList } from 'douban/routes/type';
import {
	CurrentMovieListType,
	MovieItemType,
	MovieStateType,
} from 'douban/stores/state/movie/type';

import { MOVIE_HOT_CITY } from 'douban/config/constant';

import Style from './style';
import MovieItemComponent from 'douban/components/MovieItemComponent';

const MoviePage: FC = () => {
	const tabNavigation = useNavigation<
		MaterialBottomTabNavigationProp<RootStackParamList>
	>();

	const [state, setList] = useGetList<
		MovieStateType,
		{ params: { city?: string; start?: number }; type?: CurrentMovieListType }
	>({
		key: 'movie',
	});

	const {
		type,
		list,
		refreshing,
		params: { start, count, city },
		empty,
		loadMore,
		hasMore,
	} = state;

	useEffect(() => {
		let params: { city?: string; start: number } = { start: 0 },
			url = '/movie/top250';

		if (type === CurrentMovieListType.Hot) {
			params = { city: MOVIE_HOT_CITY[0], start: 0 };
			url = '/movie/in_theaters';
		}
		setList({ params, refreshing: true, type, url });
	}, [type, city]);

	const handlePress = (item: MovieItemType) => {
		tabNavigation.navigate(EScreenName.WebView, {
			title: item.title,
			url: item.alt,
		});
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
					const {
						casts,
						genres,
						images: { medium },
						title,
						rating: { average },
						year,
					} = item as MovieItemType;

					const _casts = casts.map((cast) => cast.name);

					return (
						<MovieItemComponent
							image={medium}
							title={title}
							rate={average}
							year={year}
							casts={_casts}
							genres={genres}
							onPress={() => handlePress(item as any)}
						/>
					);
				}}
			/>
		</View>
	);
};

export default MoviePage;
