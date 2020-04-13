import React, { FC, useContext, useEffect, useState } from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { View, Text, Alert } from 'react-native';

import { DouBanContext } from 'douban/stores';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'douban/routes/type';
import { EScreenName } from 'douban/routes/type';
import { BookItemType } from 'douban/stores/state/book/type';

import { request } from 'douban/utils/request';

const BookDetailPage: FC = () => {
	const stackNavigation = useNavigation<
			StackNavigationProp<RootStackParamList>
		>(),
		route = useRoute<RouteProp<RootStackParamList, EScreenName.BookDetail>>(),
		{
			state: { book },
		} = useContext(DouBanContext),
		[detail, setDetail] = useState<BookItemType | null>(null);

	const { title, id } = route.params;

	const getDetail = async () => {
		try {
			const res = await request({
				url: `/book/${id}`,
			});
			if (res) {
				setDetail(res);
			}
		} catch (e) {}
	};

	useEffect(() => {
		if (!id) {
			Alert.alert(
				'书籍的id参数缺失',
				'',
				[
					{
						text: '确定',
						onPress: () => stackNavigation.goBack(),
					},
				],
				{ cancelable: false },
			);
			return;
		}
		stackNavigation.setOptions({
			title,
		});
		// 先从store中取缓存数据展示
		const _detail = book.list.find((item) => item.id === id) || null;
		setDetail(_detail);
		// 在通过网络请求更新数据
		getDetail();
	}, [id]);

	return (
		detail && (
			<View>
				<Text>1</Text>
			</View>
		)
	);
};

export default BookDetailPage;
