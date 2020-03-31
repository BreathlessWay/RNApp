import React, { forwardRef } from 'react';

import { FlatList, ListRenderItemInfo, RefreshControl } from 'react-native';
import EmptyComponent from 'trending/components/common/EmptyComponent';
import ListFooterComponent from 'trending/components/common/ListFooterComponent';

export type CommonFlatListPropType = {
	list: Array<{ id?: string | number; rank?: number }>;
	onRefresh: () => void;
	onEndReached: () => void;
	refreshing: boolean;
	empty: boolean;
	hasMore: boolean;
	loadMore: boolean;
	renderItem: (
		params: ListRenderItemInfo<{ id?: string | number }>,
	) => JSX.Element;
	theme: string;
	needRefresh?: boolean;
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
		theme,
		needRefresh = true,
	} = props;

	return (
		<FlatList
			ref={ref as any}
			refreshControl={
				needRefresh ? (
					<RefreshControl
						// iOS
						title="Loading..."
						titleColor={theme}
						tintColor={theme}
						// Android
						colors={[theme]}
						onRefresh={onRefresh}
						refreshing={refreshing}
					/>
				) : (
					(null as any)
				)
			}
			data={list}
			keyExtractor={(item) => String(item.id || item.rank)}
			renderItem={(params) => renderItem(params)}
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
