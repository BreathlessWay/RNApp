import React, { FC, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { View, Text, Alert } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { setHeader } from '@components/business/NavHeader';

import { Store } from '@/stores';

import { StackNavigationProp } from '@react-navigation/stack';
import { EScreenName, RootStackParamList } from '@routes/route.d';
import { TabItemType } from '@/types/tab.d';

import { EPageSource } from '@config/constant';

import Style from './style';

export type SortPagePropType = Pick<
	Store,
	'appStore' | 'popularStore' | 'trendStore'
>;

const SortPage: FC<SortPagePropType> = props => {
	const [list, setList] = useState<Array<TabItemType>>([]),
		[isEdit, setIsEdit] = useState(false);

	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(),
		route = useRoute<RouteProp<RootStackParamList, EScreenName.Sort>>();
	const { type, title } = route.params;

	const {
		appStore: { theme },
		popularStore: { popularTabList, initialPopularTab },
		trendStore: { trendTabList, initialTrendTab },
	} = props;

	const initialList = () => {
		if (type === EPageSource.language) {
			setList(popularTabList.concat());
		}

		if (type === EPageSource.key) {
			setList(trendTabList.concat());
		}
	};

	useEffect(() => {
		initialList();
	}, [type]);

	const handleSave = () => {
		if (type === EPageSource.language) {
			initialPopularTab(list);
		}
		if (type === EPageSource.key) {
			initialTrendTab(list);
		}
		navigation.goBack();
	};

	const handleBack = () => {
		if (isEdit) {
			Alert.alert('提示', '是否保存修改', [
				{
					text: '取消',
					onPress: () => {
						initialList();
						navigation.goBack();
					},
				},
				{
					text: '保存',
					onPress: handleSave,
				},
			]);
		} else {
			navigation.goBack();
		}
	};

	setHeader({
		navigation,
		title,
		right: <Text style={Style.save}>保存</Text>,
		left: <IonIcons name={'ios-arrow-back'} size={20} color="#fff" />,
		onPressLeft: handleBack,
		onPressRight: handleSave,
	});

	return (
		<>
			{list.map(item => (
				<View style={Style.item}>
					<Text style={{ color: theme }}>{item.title}</Text>
					<MaterialCommunityIcons name="sort" color={theme} size={18} />
				</View>
			))}
		</>
	);
};

const SortScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
	popularStore: stores.popularStore,
	trendStore: stores.trendStore,
}))(observer(SortPage)) as unknown) as FC;

export default SortScreen;
