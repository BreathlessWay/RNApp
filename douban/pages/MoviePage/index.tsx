import React, { FC, useContext, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { Alert, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommonFlatList from 'douban/components/CommonFlatList';
import MovieItemComponent from 'douban/components/MovieItemComponent';

import { DouBanContext } from 'douban/stores';

import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { EScreenName, RootStackParamList } from 'douban/routes/type';
import {
	CurrentMovieListType,
	MovieItemType,
} from 'douban/stores/state/movie/type';
import { ActionType } from 'douban/stores/reducer/type';

import { MOVIE_HOT_CITY } from 'douban/config/constant';

import * as Qs from 'qs';
import { fetchData } from 'douban/utils/dataStore';

import Style from './style';

const MoviePage: FC = () => {
	const tabNavigation = useNavigation<
			MaterialBottomTabNavigationProp<RootStackParamList>
		>(),
		{ state, dispatch } = useContext(DouBanContext),
		[showTypePicker, setShowTypePicker] = useState(false),
		[showCityPicker, setShowCityPicker] = useState(false);

	const {
		type,
		list,
		refreshing,
		params: { start, count, city },
		loadMore,
	} = state.movie;

	const stackNavigation = state.app.stackNavigation;
	let _data: Array<MovieItemType> = [],
		_empty = false,
		_hasMore = false;

	if (type === CurrentMovieListType.Hot) {
		_data = list?.[CurrentMovieListType.Hot]?.[city]?.list ?? [];
		_empty = list?.[CurrentMovieListType.Hot]?.[city]?.empty ?? true;
		_hasMore = list?.[CurrentMovieListType.Hot]?.[city]?.hasMore ?? true;
	}
	if (type === CurrentMovieListType.Top) {
		_data = list?.[CurrentMovieListType.Top]?.list ?? [];
		_empty = list?.[CurrentMovieListType.Top]?.empty ?? true;
		_hasMore = list?.[CurrentMovieListType.Top]?.hasMore ?? true;
	}

	const getList = ({
		queryCity = city,
		queryStart = 0,
		queryType = type,
		queryRefreshing = false,
		queryLoadMore = false,
	}: {
		queryCity?: string;
		queryStart?: number;

		queryType?: CurrentMovieListType;
		queryRefreshing?: boolean;
		queryLoadMore?: boolean;
	}) => {
		let params: { city?: string; start: number; count: number } = {
				start: queryStart,
				count,
			},
			url = '/movie/top250';

		if (queryType === CurrentMovieListType.Hot) {
			params = { city: queryCity, start: queryStart, count };
			url = '/movie/in_theaters';
		}

		if (refreshing || loadMore || !_hasMore) return;
		dispatch({
			type: ActionType.LOADING_MOVIE_LIST_START,
			payload: {
				params,
				type: queryType,
				refreshing: queryRefreshing,
				loadMore: queryLoadMore,
			},
		});

		const _params = Qs.stringify(params);

		fetchData({ url: `${url}?${_params}` })
			.then((res) => {
				dispatch({
					type: ActionType.LOADING_MOVIE_LIST_SUCCESS,
					payload: {
						list: res.subjects ?? [],
						total: res.total ?? 0,
						refreshing: false,
						loadMore: false,
						error: false,
						errMsg: '',
					},
				});
			})
			.catch((err) => {
				dispatch({
					type: ActionType.LOADING_MOVIE_LIST_FAIL,
					payload: {
						refreshing: false,
						loadMore: false,
						error: true,
						errMsg: err.message,
					},
				});
			});
	};

	const setHeader = (paramsType: CurrentMovieListType) => {
		stackNavigation?.setOptions({
			headerTitle: (props) => (
				<TouchableOpacity onPress={handlePressTitle}>
					<Text
						style={{
							color: props.tintColor,
							fontSize: 17,
							fontWeight: '600',
						}}
						numberOfLines={1}>
						{paramsType === CurrentMovieListType.Top ? 'Top250' : '当前热映'}
					</Text>
				</TouchableOpacity>
			),
		});
	};

	const handlePressTitle = () => {
		Alert.alert('你想要查看什么', '', [
			{
				text: '查看热映',
				onPress: () => {
					setHeader(CurrentMovieListType.Hot);
					_empty = false;
					_hasMore = true;
					setShowCityPicker(false);
					getList({
						queryCity: MOVIE_HOT_CITY[0],
						queryType: CurrentMovieListType.Hot,
						queryRefreshing: true,
					});
				},
			},
			{
				text: '查看top250',
				onPress: () => {
					setHeader(CurrentMovieListType.Top);
					_empty = false;
					_hasMore = true;
					setShowCityPicker(false);
					getList({
						queryType: CurrentMovieListType.Top,
						queryRefreshing: true,
					});
				},
			},
			{
				text: '取消',
			},
		]);
	};

	useEffect(() => {
		getList({
			queryCity: MOVIE_HOT_CITY[0],
			queryType: CurrentMovieListType.Hot,
			queryRefreshing: true,
		});
	}, []);

	useEffect(() => {
		const unsubscribe = tabNavigation.addListener('focus', () => {
			setShowCityPicker(false);
			setHeader(type);
		});
		return unsubscribe;
	}, [tabNavigation]);

	const handlePress = (item: MovieItemType) => {
		tabNavigation.navigate(EScreenName.WebView, {
			title: item.title,
			url: item.alt,
		});
	};

	const handleSelectCity = (item: string) => {
		_empty = item !== city;
		_hasMore = item !== city;
		setShowCityPicker(false);
		getList({
			queryCity: item,
			queryRefreshing: true,
		});
	};

	return (
		<View style={Style.wrap}>
			{type === CurrentMovieListType.Hot && (
				<TouchableOpacity
					onPress={() => setShowCityPicker(true)}
					activeOpacity={1}>
					<View style={Style.cityColumn}>
						<Text style={Style.currentCity}>{city}</Text>
						<AntDesign
							name={showCityPicker ? 'up' : 'down'}
							color={'#000'}
							size={12}
						/>
					</View>
				</TouchableOpacity>
			)}
			<CommonFlatList
				data={_data}
				empty={_empty}
				loadMore={loadMore}
				hasMore={_hasMore}
				refreshing={refreshing}
				onEndReached={() =>
					getList({
						queryStart: start + count,
						queryLoadMore: true,
					})
				}
				onRefresh={() =>
					getList({
						queryRefreshing: true,
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
			{showCityPicker && (
				<>
					<TouchableOpacity
						onPress={() => setShowCityPicker(false)}
						activeOpacity={1}
						style={Style.mask}
					/>
					<View style={Style.cityList}>
						<AntDesign
							name={'caretup'}
							color={'#fff'}
							size={16}
							style={Style.icon}
						/>
						{MOVIE_HOT_CITY.map((item) => {
							let _style = item === city ? Style.cityItemChecked : {};
							return (
								<TouchableOpacity
									onPress={() => handleSelectCity(item)}
									activeOpacity={1}>
									<Text key={item} style={{ ...Style.cityItem, ..._style }}>
										{item}
									</Text>
								</TouchableOpacity>
							);
						})}
					</View>
				</>
			)}
		</View>
	);
};

export default MoviePage;
