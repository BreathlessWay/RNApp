import React, { FC, useContext, useEffect, useState } from 'react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { View, Text, Alert, ScrollView } from 'react-native';
import BookItemComponent from 'douban/components/BookItemComponent';

import { DouBanContext } from 'douban/stores';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'douban/routes/type';
import { EScreenName } from 'douban/routes/type';
import { BookItemType } from 'douban/stores/state/book/type';

import { request } from 'douban/utils/request';

import Style from './style';

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
		// 再通过网络请求更新数据
		getDetail();
	}, [id]);

	return (
		detail && (
			<ScrollView style={Style.wrap}>
				<BookItemComponent
					author={detail.author.join(',')}
					image={detail.image}
					pages={detail.pages}
					price={detail.price}
					publisher={detail.publisher}
					title={detail.title}
				/>
				<View style={Style.content}>
					<Text style={Style.date}>出版日期：{detail.pubdate}</Text>
					<Text style={Style.rate}>评分：{detail.rating.average}</Text>
					<Text style={Style.rate}>书籍标签：</Text>
					<View style={Style.tags}>
						{detail.tags.map((tag) => (
							<Text style={Style.tag}>{tag.title}</Text>
						))}
					</View>
					<View style={Style.line} />
					<Text style={Style.detail}>{detail.author_intro}</Text>
					<View style={Style.line} />
					<Text style={Style.detail}>书籍简介：</Text>
					<Text style={Style.detail}>{detail.summary}</Text>
					<View style={Style.line} />
					<Text style={Style.detail}>{detail.catalog}</Text>
				</View>
			</ScrollView>
		)
	);
};

export default BookDetailPage;
