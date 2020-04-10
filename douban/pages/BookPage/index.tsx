import React, { FC, useEffect } from 'react';

import { View, Text } from 'react-native';

import { useGetList } from 'douban/services/getList';

import { BookStateType } from 'douban/stores/state/book/type';

import Style from './style';

const BookPage: FC = () => {
	const [state, setList] = useGetList<BookStateType, { params: { q: string } }>(
		{
			url: '/book/search',
			key: 'book',
		},
	);

	const { list, refreshing, hasMore, empty, loadMore } = state;

	useEffect(() => {
		setList({ params: { q: 'javascript' }, refreshing: true });
	}, []);

	return (
		<View>
			<Text>1</Text>
		</View>
	);
};

export default BookPage;
