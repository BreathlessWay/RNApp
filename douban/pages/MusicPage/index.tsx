import React, { FC, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { Alert, View } from 'react-native';
import CommonFlatList from 'douban/components/CommonFlatList';
import SearchComponent from 'douban/components/SearchComponent';
import MusicItemComponent from 'douban/components/MusicItemComponent';

import { useGetList } from 'douban/services/getList';

import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { EScreenName, RootStackParamList } from 'douban/routes/type';
import { MusicStateType } from 'douban/stores/state/music/type';

import Style from './style';

const MusicPage: FC = () => {
	const [keyword, setKeyword] = useState<string>('');

	const tabNavigation = useNavigation<
		MaterialBottomTabNavigationProp<RootStackParamList>
	>();

	const [state, setList] = useGetList<
		MusicStateType,
		{ params: { q?: string; start?: number } }
	>({
		url: '/music/search',
		key: 'music',
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
		setKeyword('周杰伦');
		setList({ params: { q: '周杰伦' }, refreshing: true });
	}, []);

	const handlePress = (item: any) => {
		tabNavigation.navigate(EScreenName.BookDetail, {
			title: item.title,
			id: item.id,
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
			<SearchComponent
				value={keyword}
				onChangeText={handleChangeText}
				onSubmitEditing={handleSubmit}
			/>
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
					return (
						<MusicItemComponent
							title={item.title}
							image={item.image}
							author={item.author?.[0]?.name}
							pubdate={item.attrs?.pubdate}
							rate={item.rating?.average}
						/>
					);
				}}
			/>
		</View>
	);
};

export default MusicPage;
