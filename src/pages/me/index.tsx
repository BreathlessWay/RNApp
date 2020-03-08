import React, { FC, useCallback } from 'react';
import { inject, observer } from 'mobx-react';

import { useFocusEffect } from '@react-navigation/native';

import { Text, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MenuListItem from '@components/business/MenuListItem';

import { setHeader, setHeaderParams } from '@components/business/NavHeader';

import { Store } from '@/stores';

import { MENU_LIST } from '@config/menu';

import Style from './style';

export type MePagePropType = Pick<Store, 'appStore'>;

const MePage: FC<MePagePropType> = props => {
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

	const handlePressIcon = ({
		name,
		icon,
	}: {
		name: string;
		icon: string;
	}) => {};

	return (
		<ScrollView>
			<MenuListItem
				{...MENU_LIST.About}
				title="GtiHub Popular"
				iconStyle={Style.iconStyle}
			/>
			<MenuListItem {...MENU_LIST.Tutorial} />
			<Text style={Style.group}>趋势管理</Text>
			<MenuListItem {...MENU_LIST.Custom_Language} />
			<MenuListItem {...MENU_LIST.Sort_Language} />
			<Text style={Style.group}>最热管理</Text>
			<MenuListItem {...MENU_LIST.Custom_Key} />
			<MenuListItem {...MENU_LIST.Sort_Key} />
			<MenuListItem {...MENU_LIST.Remove_Key} />
			<Text style={Style.group}>设置</Text>
			<MenuListItem {...MENU_LIST.Custom_Theme} />
			<MenuListItem {...MENU_LIST.About_Author} />
			<MenuListItem {...MENU_LIST.Feedback} />
		</ScrollView>
	);
};

const MeScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
}))(observer(MePage)) as unknown) as FC;

export default MeScreen;
