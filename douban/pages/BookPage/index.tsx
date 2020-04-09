import React, { FC, useContext, useEffect } from 'react';

import { View, Text } from 'react-native';

import { DouBanContext } from 'douban/stores';

import { ActionType } from 'douban/stores/reducer/type';

import Style from './style';

const BookPage: FC = () => {
	const { state, dispatch } = useContext(DouBanContext);

	const {
		book: { list, empty, hasMore, loadMore, refreshing, q, params },
	} = state;

	const getData = (payload: {
		loadMore?: boolean;
		refreshing?: boolean;
		q: string;
		start?: number;
	}) => {
		if (refreshing || loadMore || !hasMore) return;
		dispatch({ type: ActionType.LOADING_BOOK_LIST_START, payload });
	};

	useEffect(() => {
		getData({ q: 'aaa', refreshing: true });
	}, []);

	return (
		<View>
			<Text>{q}</Text>
		</View>
	);
};

export default BookPage;
