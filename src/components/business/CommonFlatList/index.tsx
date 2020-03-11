import React, { forwardRef } from 'react';

import { FlatList, ListRenderItemInfo, RefreshControl } from 'react-native';
import EmptyComponent from '@components/common/EmptyComponent';
import ListFooterComponent from '@components/common/ListFooterComponent';

export type CommonFlatListPropType = {
	list: Array<{ id: string | number; rank?: number }>;
	onRefresh: () => void;
	onEndReached: () => void;
	refreshing: boolean;
	empty: boolean;
	hasMore: boolean;
	loadMore: boolean;
	renderItem: (
		params: ListRenderItemInfo<{ id: string | number }>,
	) => JSX.Element;
};

const CommonFlatList = forwardRef<
	FlatList<{ id: string | number }>,
	CommonFlatListPropType
>((props, ref) => {
	const {
		renderItem,
		list = [],
		onRefresh,
		refreshing,
		empty,
		hasMore,
		loadMore,
		onEndReached,
	} = props;

	return (
		<FlatList
			ref={ref as any}
			refreshControl={
				<RefreshControl
					// iOS
					title="Loading..."
					titleColor="green"
					tintColor="green"
					// Android
					colors={['green']}
					onRefresh={onRefresh}
					refreshing={refreshing}
				/>
			}
			data={list}
			keyExtractor={item => String(item.id) || String(item.rank)}
			renderItem={params => renderItem(params)}
			ListEmptyComponent={refreshing ? null : <EmptyComponent />}
			ListFooterComponent={
				empty ? null : (
					<ListFooterComponent hasMore={hasMore} loadMore={loadMore} />
				)
			}
			onEndReached={onEndReached}
			onEndReachedThreshold={0.5}
		/>
	);
});

export default CommonFlatList;
