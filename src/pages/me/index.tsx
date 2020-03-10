import React, { FC, useCallback, useRef } from 'react';
import { inject, observer } from 'mobx-react';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Text, ScrollView, Linking, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MenuListItem from '@components/business/MenuListItem';
import Toast from 'react-native-easy-toast';

import { setHeader, setHeaderParams } from '@components/business/NavHeader';

import { Store } from '@/stores';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { EScreenName, RootStackParamList } from '@routes/route.d';

import { MENU_LIST } from '@config/menu';

import Style from './style';

export type MePagePropType = Pick<Store, 'appStore'>;

const MePage: FC<MePagePropType> = props => {
	const ref = useRef<Toast>();

	const navigation = useNavigation<
		BottomTabNavigationProp<RootStackParamList>
	>();

	const {
		appStore: { stackNavigation },
	} = props;

	const handlePressRight = () => {};

	const headerOptions: setHeaderParams = {
		navigation: stackNavigation,
		title: '我的',
		right: <Feather name="search" size={22} color="#fff" />,
		onPressRight: handlePressRight,
	};

	useFocusEffect(
		useCallback(() => {
			setHeader(headerOptions);
		}, [stackNavigation]),
	);

	const handlePressIcon = ({ name, icon }: { name: string; icon: string }) => {
		switch (name) {
			case '关于': {
				navigation.navigate(EScreenName.About);
				break;
			}
			default: {
			}
		}
	};

	const handleFeedback = async () => {
		try {
			const isSupport = await Linking.canOpenURL('mailto://731005087@qq.com');
			if (isSupport) {
				await Linking.openURL('mailto://731005087@qq.com');
			}
		} catch (e) {
			ref.current && ref.current.show(e.message);
		}
	};

	return (
		<ScrollView>
			<MenuListItem
				{...MENU_LIST.About}
				title="GtiHub Popular"
				iconStyle={Style.iconStyle}
				onPress={() =>
					handlePressIcon({
						name: MENU_LIST.About.name,
						icon: MENU_LIST.About.icon,
					})
				}
			/>
			<Text style={Style.group}>趋势管理</Text>
			<MenuListItem {...MENU_LIST.Custom_Language} />
			<MenuListItem {...MENU_LIST.Sort_Language} hasBorder={false} />
			<Text style={Style.group}>最热管理</Text>
			<MenuListItem {...MENU_LIST.Sort_Key} />
			<MenuListItem {...MENU_LIST.Remove_Key} hasBorder={false} />
			<Text style={Style.group}>设置</Text>
			<MenuListItem {...MENU_LIST.Custom_Theme} />
			<MenuListItem
				{...MENU_LIST.About_Author}
				onPress={() => navigation.navigate(EScreenName.Author)}
			/>
			<MenuListItem
				{...MENU_LIST.Feedback}
				hasBorder={false}
				onPress={handleFeedback}
			/>
			<Toast ref={ref as any} position="center" />
		</ScrollView>
	);
};

const MeScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
}))(observer(MePage)) as unknown) as FC;

export default MeScreen;
