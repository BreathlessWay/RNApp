import React, { FC, useCallback } from 'react';
import { inject, observer } from 'mobx-react';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Text, ScrollView, Linking } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MenuListItem from '@components/common/MenuListItem';

import { setHeader, setHeaderParams } from '@components/business/NavHeader';

import { Store } from '@/stores';

import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { EScreenName, RootStackParamList } from '@routes/route.d';

import { MENU_LIST } from '@config/menu';
import { ECustomEditPageSource } from '@config/constant';

import Style from './style';

export type MePagePropType = Pick<Store, 'appStore'>;

const MePage: FC<MePagePropType> = props => {
	const navigation = useNavigation<
		BottomTabNavigationProp<RootStackParamList>
	>();

	const {
		appStore: { stackNavigation, theme },
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

	const handleFeedback = async () => {
		try {
			const isSupport = await Linking.canOpenURL('mailto://731005087@qq.com');
			if (isSupport) {
				await Linking.openURL('mailto://731005087@qq.com');
			}
		} catch (e) {
			global.ref.current && global.ref.current.show(e.message);
		}
	};

	return (
		<ScrollView>
			<MenuListItem
				hasBorder={false}
				themeColor={theme}
				{...MENU_LIST.About}
				title="GtiHub Popular"
				iconStyle={Style.iconStyle}
				onPress={() => navigation.navigate(EScreenName.About)}
			/>
			<Text style={Style.group}>趋势管理</Text>
			<MenuListItem
				{...MENU_LIST.Custom_Language}
				themeColor={theme}
				onPress={() =>
					navigation.navigate(EScreenName.Edit, {
						type: ECustomEditPageSource.language,
						title: MENU_LIST.Custom_Language.name,
					})
				}
			/>
			<MenuListItem
				{...MENU_LIST.Sort_Language}
				hasBorder={false}
				themeColor={theme}
			/>
			<Text style={Style.group}>最热管理</Text>
			<MenuListItem
				{...MENU_LIST.Custom_Key}
				themeColor={theme}
				onPress={() =>
					navigation.navigate(EScreenName.Edit, {
						type: ECustomEditPageSource.key,
						title: MENU_LIST.Custom_Key.name,
					})
				}
			/>
			<MenuListItem
				{...MENU_LIST.Sort_Key}
				themeColor={theme}
				hasBorder={false}
			/>
			<Text style={Style.group}>设置</Text>
			<MenuListItem {...MENU_LIST.Custom_Theme} themeColor={theme} />
			<MenuListItem
				themeColor={theme}
				{...MENU_LIST.About_Author}
				onPress={() => navigation.navigate(EScreenName.Author)}
			/>
			<MenuListItem
				themeColor={theme}
				{...MENU_LIST.Feedback}
				hasBorder={false}
				onPress={handleFeedback}
			/>
		</ScrollView>
	);
};

const MeScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
}))(observer(MePage)) as unknown) as FC;

export default MeScreen;
