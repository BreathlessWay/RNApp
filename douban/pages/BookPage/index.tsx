import React, { FC, useEffect } from 'react';

import { View, Text } from 'react-native';

import { useGetList } from 'douban/services/getList';

import { BookStateType } from 'douban/stores/state/book/type';

import Style from './style';
import CommonFlatList from 'douban/components/CommonFlatList';
import BookItemComponent from 'douban/components/BookItemComponent';

const BookPage: FC = () => {
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
