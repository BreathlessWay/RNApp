import React, { FC } from 'react';
import { inject, observer } from 'mobx-react';

import { useNavigation } from '@react-navigation/native';

import { View, Text, TouchableHighlight, Alert } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
// @ts-ignore
import { SwipeableFlatList } from 'react-native-swipeable-lists';

import { setHeader } from 'trending/components/business/NavHeader';

import { Store } from 'trending/stores';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'trending/routes/route.d';
import { TabItemType } from 'trending/types/tab.d';

import { MIN_TAB_COUNT } from 'trending/config/constant';

import Style, { actionWidth } from './style';

export type RemovePagePropType = Pick<Store, 'appStore' | 'popularStore'>;

const RemovePage: FC<RemovePagePropType> = (props) => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	const {
		appStore: { theme },
		popularStore: { popularTabList, initialPopularTab },
	} = props;

	const handleBack = () => {
		navigation.goBack();
	};

	const handleDelete = (item: TabItemType) => {
		const lastList = popularTabList.filter((_) => _.title !== item.title),
			lastCheckedList = lastList.filter((_) => _.checked);

		if (lastCheckedList.length < MIN_TAB_COUNT) {
			global.ref.current &&
				global.ref.current.show(`最少保留${MIN_TAB_COUNT}个显示标签`);
		} else {
			Alert.alert('确认删除？', '', [
				{
					text: '取消',
				},
				{
					text: '确定',
					onPress: () => {
						initialPopularTab(lastList);
					},
				},
			]);
		}
	};

	setHeader({
		navigation,
		title: '移除语言',
		left: <IonIcons name={'ios-arrow-back'} size={20} color="#fff" />,
		onPressLeft: handleBack,
	});

	return (
		<SwipeableFlatList
			data={popularTabList}
			keyExtractor={(item: TabItemType) => item.title}
			renderItem={({ item }: { item: TabItemType }) => (
				<View style={Style.item}>
					<Text style={{ ...Style.text, color: theme }}>{item.title}</Text>
					<Text style={{ ...Style.tip }}>
						({item.checked ? '显示中' : '已隐藏'})
					</Text>
				</View>
			)}
			// 创建侧滑菜单
			renderQuickActions={({ item }: { item: TabItemType }) => (
				<View style={{ ...Style.quickAContent, backgroundColor: theme }}>
					<TouchableHighlight onPress={() => handleDelete(item)}>
						<View style={Style.quick}>
							<Text style={Style.delete}>删除</Text>
						</View>
					</TouchableHighlight>
				</View>
			)} // 创建侧滑菜单
			maxSwipeDistance={actionWidth} // 可展开（滑动）的距离
			bounceFirstRowOnMount={false} // 进去的时候不展示侧滑效果
		/>
	);
};

const RemoveScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
	popularStore: stores.popularStore,
}))(observer(RemovePage)) as unknown) as FC;

export default RemoveScreen;
