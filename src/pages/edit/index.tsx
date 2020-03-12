import React, { FC, useCallback, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import {
	RouteProp,
	useFocusEffect,
	useNavigation,
	useRoute,
} from '@react-navigation/native';

import {
	Alert,
	BackHandler,
	ScrollView,
	Switch,
	Text,
	View,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { setHeader } from '@components/business/NavHeader';

import { Store } from '@/stores';

import { StackNavigationProp } from '@react-navigation/stack';
import { EScreenName, RootStackParamList } from '@routes/route.d';
import { TabItemType } from '@/types/tab.d';

import {
	ECustomEditPageSource,
	MIN_TAB_COUNT,
	POPULAR_TABS_LIST,
	TREND_TABS_LIST,
} from '@config/constant';

import Style from './style';

export type CustomEditPagePropType = Pick<
	Store,
	'appStore' | 'popularStore' | 'trendStore'
>;

const CustomEditPage: FC<CustomEditPagePropType> = props => {
	const [list, setList] = useState<Array<TabItemType>>([]),
		[isEdit, setIsEdit] = useState(false);

	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(),
		route = useRoute<RouteProp<RootStackParamList, EScreenName.Edit>>();
	const { type, title } = route.params;

	const {
		appStore: { theme },
		popularStore: { popularTabList, initialPopularTab },
		trendStore: { trendTabList, initialTrendTab },
	} = props;

	const initialList = () => {
		if (type === ECustomEditPageSource.language) {
			setList(
				POPULAR_TABS_LIST.map(item => {
					const checked = popularTabList.find(_ => _.key === item.key);
					return {
						...item,
						checked: Boolean(checked),
					};
				}),
			);
		}

		if (type === ECustomEditPageSource.key) {
			setList(
				TREND_TABS_LIST.map(item => {
					const checked = trendTabList.find(_ => _.key === item.key);
					return {
						...item,
						checked: Boolean(checked),
					};
				}),
			);
		}
	};

	useEffect(() => {
		initialList();
	}, [type]);

	const handleSave = () => {
		const checkedList = list.filter(item => item.checked);
		if (checkedList.length < MIN_TAB_COUNT) {
			Alert.alert('提示', `最少选择个${MIN_TAB_COUNT}标签`, [
				{
					text: '确定',
				},
			]);
		} else {
			if (type === ECustomEditPageSource.language) {
				initialPopularTab(checkedList);
			}
			if (type === ECustomEditPageSource.key) {
				initialTrendTab(checkedList);
			}
			navigation.goBack();
		}
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

	const handleChange = (item: TabItemType) => {
		setIsEdit(true);
		setList(
			list.map(_ => {
				if (_.key === item.key) {
					_.checked = !_.checked;
				}
				return _;
			}),
		);
	};

	setHeader({
		navigation,
		title,
		right: <Text style={Style.save}>保存</Text>,
		left: <IonIcons name={'ios-arrow-back'} size={20} color="#fff" />,
		onPressLeft: handleBack,
		onPressRight: handleSave,
	});

	// 安卓物理返回键处理
	useFocusEffect(
		useCallback(() => {
			BackHandler.addEventListener('hardwareBackPress', handleBack);
			return () =>
				BackHandler.removeEventListener('hardwareBackPress', handleBack);
		}, [list]),
	);

	return (
		<ScrollView>
			{list.map(item => (
				<View style={Style.item}>
					<Text style={{ color: theme }}>{item.title}</Text>
					<Switch
						value={item.checked}
						onValueChange={() => handleChange(item)}
						trackColor={{
							false: '#ccc',
							true: theme,
						}}
					/>
				</View>
			))}
		</ScrollView>
	);
};

const CustomEditScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
	popularStore: stores.popularStore,
	trendStore: stores.trendStore,
}))(observer(CustomEditPage)) as unknown) as FC;

export default CustomEditScreen;
