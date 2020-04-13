import React, { FC, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { View } from 'react-native';
import CommonFlatList from 'douban/components/CommonFlatList';
import BookItemComponent from 'douban/components/BookItemComponent';
import BookSearchComponent from 'douban/components/BookSearchComponent';

import { useGetList } from 'douban/services/getList';

import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { EScreenName, RootStackParamList } from 'douban/routes/type';
import { BookStateType } from 'douban/stores/state/book/type';

import Style from './style';

const BookPage: FC = () => {
	const [keyword, setKeyword] = useState<string>('');

	const tabNavigation = useNavigation<
		MaterialBottomTabNavigationProp<RootStackParamList>
	>();

	const [state, setList] = useGetList<
		BookStateType,
		{ params: { q?: string; start?: number } }
	>({
		url: '/book/search',
		key: 'book',
	});

	const {
		list,
		refreshing,
		params: { q, start, count },
		empty,
		loadMore,
		hasMore,
	} = state;

	useEffect(() => {
		setKeyword('javascript');
		setList({ params: { q: 'javascript' }, refreshing: true });
	}, []);

	const handlePress = (item: any) => {
		tabNavigation.navigate(EScreenName.WebView, {
			title: item.title,
			url: item.alt,
		});
	};

	const handleChangeText = (text: string) => {
		setKeyword(text);
	};

	const handleSubmit = () => {
		setList({ params: { q: keyword, start: 0 }, refreshing: true });
	};

	return (
		<View style={Style.wrap}>
			<BookSearchComponent
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
						<BookItemComponent
							onPress={() => handlePress(item)}
							title={item.title}
							author={item.author.join(', ')}
							image={item.image}
							pages={item.pages}
							price={item.price}
							publisher={item.publisher}
						/>
					);
				}}
			/>
		</View>
	);
};

export default BookPage;
