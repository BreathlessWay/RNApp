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
	data: any;
	renderItem: ListRenderItem<any> | null | undefined;
	onEndReached: any;
	onRefresh: any;
	refreshing: boolean;
};

const CommonFlatList: FC<CommonFlatListPropType> = (props) => {
	const { data, renderItem, onEndReached, onRefresh, refreshing } = props;

	return (
		<FlatList
			data={data}
			renderItem={renderItem}
			ListEmptyComponent={
				<View>
					<Text>1</Text>
				</View>
			}
			ListFooterComponent={
				<View>
					<Text>1</Text>
				</View>
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
