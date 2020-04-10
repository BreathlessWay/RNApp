import React, { FC } from 'react';

import {
	View,
	Text,
	FlatList,
	ListRenderItem,
	RefreshControl,
} from 'react-native';

import Style from './style';

export type CommonFlatListPropType = {
	data: Array<{ id: string; [key: string]: any }>;
	renderItem: ListRenderItem<{ id: string; [key: string]: any }>;
	onEndReached: () => void;
	onRefresh: () => void;
	refreshing: boolean;
	empty: boolean;
	hasMore: boolean;
	loadMore: boolean;
};

const CommonFlatList: FC<CommonFlatListPropType> = (props) => {
	const {
		data,
		renderItem,
		onEndReached,
		onRefresh,
		refreshing,
		empty,
		loadMore,
		hasMore,
	} = props;

	return (
		<FlatList
			data={data}
			renderItem={renderItem}
			ListEmptyComponent={
				<View style={Style.emptyWrap}>
					<Text style={Style.emptyContent}>暂无数据</Text>
				</View>
			}
			ListFooterComponent={
				empty ? null : (
					<View style={Style.footerWrap}>
						<Text style={Style.footerContent}>
							{loadMore ? '加载中...' : hasMore ? '上拉加载更多' : '没有更多了'}
						</Text>
					</View>
				)
			}
			keyExtractor={(item) => item.id}
			onEndReached={onEndReached}
			onEndReachedThreshold={0.5}
			refreshControl={
				<RefreshControl
					// iOS
					title="Loading..."
					// titleColor={theme}
					// tintColor={theme}
					// Android
					// colors={[theme]}
					onRefresh={onRefresh}
					refreshing={refreshing}
				/>
			}
		/>
	);
};

export default CommonFlatList;
