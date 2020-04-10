import React, { FC, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import CommonFlatList from 'douban/components/CommonFlatList';
import BookItemComponent from 'douban/components/BookItemComponent';

import { useGetList } from 'douban/services/getList';

import { MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { EScreenName, RootStackParamList } from 'douban/routes/type';
import { BookStateType } from 'douban/stores/state/book/type';

import { BASIC_API_KEY } from 'douban/config/constant';

import Style from './style';

const BookPage: FC = () => {
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
		params: { start, count },
	} = state;

	useEffect(() => {
		setList({ params: { q: 'javascript' }, refreshing: true });
	}, []);

	const handlePress = (item: any) => {
		tabNavigation.navigate(EScreenName.WebView, {
			title: item.title,
			url: item.alt,
		});
	};

	return (
		<CommonFlatList
			data={list}
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
						author={item.author}
						image={item.image}
						pages={item.pages}
						price={item.price}
						publisher={item.publisher}
					/>
				);
			}}
		/>
	);
};

export default BookPage;
