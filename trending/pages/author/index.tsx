import React, { FC } from 'react';
import { inject, observer } from 'mobx-react';

import { useNavigation } from '@react-navigation/native';

import { Clipboard } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OctIcons from 'react-native-vector-icons/Octicons';
import MenuListItem from 'trending/components/common/MenuListItem';
import CommonParallaxScrollView from 'trending/components/common/CommonParallaxScrollView';
import AnimateSliderComponent from 'trending/components/common/AnimateSliderComponent';

import { Store } from 'trending/stores';

import { StackNavigationProp } from '@react-navigation/stack';
import { EScreenName, RootStackParamList } from 'trending/routes/route.d';

import Style from './style';

import aboutJson from 'trending/config/about.json';

const ITEM_HEIGHT = 59;

export type AuthorPagePropType = Pick<Store, 'appStore'>;

const AuthorPage: FC<AuthorPagePropType> = (props) => {
	const {
		appStore: { theme },
	} = props;

	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	const handlePressItem = ({
		title,
		value,
	}: {
		title: string;
		value: string;
	}) => {
		if (value.startsWith('http')) {
			navigation.navigate(EScreenName.WebView, {
				title,
				url: value,
			});
		} else {
			Clipboard.setString(value);
			global.ref.current?.show('复制成功');
		}
	};

	return (
		<CommonParallaxScrollView
			theme={theme}
			navigation={navigation}
			title={aboutJson.author.name}
			imageUrl={aboutJson.author.backgroundImg}
			name={aboutJson.author.name}
			avatarUrl={aboutJson.author.avatar}
			description={aboutJson.author.description}>
			<AnimateSliderComponent
				title={aboutJson.aboutMe.Blog.name}
				theme={theme}
				height={ITEM_HEIGHT * 2}
				Icons={IonIcons}
				icon={aboutJson.aboutMe.Blog.icon}>
				{aboutJson.aboutMe.Blog.items.map((item) => (
					<MenuListItem
						key={item.value}
						themeColor={theme}
						name={item.title}
						wrapStyle={{ paddingLeft: 32 }}
						onPress={() => handlePressItem(item)}
					/>
				))}
			</AnimateSliderComponent>
			<AnimateSliderComponent
				title={aboutJson.aboutMe.Contact.name}
				theme={theme}
				height={ITEM_HEIGHT}
				Icons={AntDesign}
				icon={aboutJson.aboutMe.Contact.icon}>
				{aboutJson.aboutMe.Contact.items.map((item) => (
					<MenuListItem
						key={item.value}
						themeColor={theme}
						name={item.title + ': ' + item.value}
						wrapStyle={{ paddingLeft: 32 }}
						onPress={() => handlePressItem(item)}
					/>
				))}
			</AnimateSliderComponent>
			<AnimateSliderComponent
				title={aboutJson.aboutMe.QQ.name}
				theme={theme}
				height={ITEM_HEIGHT}
				Icons={OctIcons}
				icon={aboutJson.aboutMe.QQ.icon}>
				{aboutJson.aboutMe.QQ.items.map((item) => (
					<MenuListItem
						key={item.value}
						themeColor={theme}
						name={item.title + ': ' + item.value}
						wrapStyle={{ paddingLeft: 32 }}
						onPress={() => handlePressItem(item)}
					/>
				))}
			</AnimateSliderComponent>
		</CommonParallaxScrollView>
	);
};

const AuthorScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
}))(observer(AuthorPage)) as unknown) as FC;

export default AuthorScreen;
