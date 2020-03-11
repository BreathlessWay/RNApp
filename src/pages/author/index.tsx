import React, { FC, useState } from 'react';
import { inject, observer } from 'mobx-react';

import { useNavigation } from '@react-navigation/native';

import { Clipboard, Animated } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OctIcons from 'react-native-vector-icons/Octicons';
import MenuListItem from '@components/common/MenuListItem';
import CommonParallaxScrollView from '@components/common/CommonParallaxScrollView';

import { Store } from '@/stores';

import { StackNavigationProp } from '@react-navigation/stack';
import { EScreenName, RootStackParamList } from '@routes/route.d';

import Style from './style';

import aboutJson from '@config/about.json';

const ITEM_HEIGHT = 59,
	ANIMATE_TIME = 300;

export type AuthorPagePropType = Pick<Store, 'appStore'>;

const AuthorPage: FC<AuthorPagePropType> = props => {
	const [slidAnimBlog] = useState(new Animated.Value(0)),
		[slidAnimToValueBlog, setSlidAnimToValueBlog] = useState(ITEM_HEIGHT * 2),
		[slidAnimContact] = useState(new Animated.Value(0)),
		[slidAnimToValueContact, setSlidAnimToValueContact] = useState(ITEM_HEIGHT),
		[slidAnimExchange] = useState(new Animated.Value(0)),
		[slidAnimToValueExchange, setSlidAnimToValueExchange] = useState(
			ITEM_HEIGHT,
		);

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
			navigation={navigation}
			title={aboutJson.author.name}
			imageUrl={aboutJson.author.backgroundImg}
			name={aboutJson.author.name}
			avatarUrl={aboutJson.author.avatar}
			description={aboutJson.author.description}>
			<MenuListItem
				themeColor={theme}
				name={aboutJson.aboutMe.Blog.name}
				Icons={IonIcons}
				icon={aboutJson.aboutMe.Blog.icon}
				onPress={() =>
					Animated.timing(
						// 随时间变化而执行动画
						slidAnimBlog, // 动画中的变量值
						{
							toValue: slidAnimToValueBlog, // 透明度最终变为1，即完全不透明
							duration: ANIMATE_TIME, // 让动画持续一段时间
						},
					).start(() => {
						slidAnimToValueBlog
							? setSlidAnimToValueBlog(0)
							: setSlidAnimToValueBlog(ITEM_HEIGHT * 2);
					})
				}
				column={true}
			/>
			<Animated.View style={{ height: slidAnimBlog }}>
				{aboutJson.aboutMe.Blog.items.map(item => (
					<MenuListItem
						themeColor={theme}
						name={item.title}
						wrapStyle={{ paddingLeft: 32 }}
						onPress={() => handlePressItem(item)}
					/>
				))}
			</Animated.View>
			<MenuListItem
				themeColor={theme}
				name={aboutJson.aboutMe.Contact.name}
				Icons={AntDesign}
				icon={aboutJson.aboutMe.Contact.icon}
				onPress={() =>
					Animated.timing(
						// 随时间变化而执行动画
						slidAnimContact, // 动画中的变量值
						{
							toValue: slidAnimToValueContact, // 透明度最终变为1，即完全不透明
							duration: ANIMATE_TIME, // 让动画持续一段时间
						},
					).start(() => {
						slidAnimToValueContact
							? setSlidAnimToValueContact(0)
							: setSlidAnimToValueContact(ITEM_HEIGHT);
					})
				}
				column={true}
			/>
			<Animated.View style={{ height: slidAnimContact }}>
				{aboutJson.aboutMe.Contact.items.map(item => (
					<MenuListItem
						themeColor={theme}
						name={item.title + ': ' + item.value}
						wrapStyle={{ paddingLeft: 32 }}
						onPress={() => handlePressItem(item)}
					/>
				))}
			</Animated.View>
			<MenuListItem
				name={aboutJson.aboutMe.QQ.name}
				Icons={OctIcons}
				themeColor={theme}
				icon={aboutJson.aboutMe.QQ.icon}
				onPress={() =>
					Animated.timing(
						// 随时间变化而执行动画
						slidAnimExchange, // 动画中的变量值
						{
							toValue: slidAnimToValueExchange, // 透明度最终变为1，即完全不透明
							duration: ANIMATE_TIME, // 让动画持续一段时间
						},
					).start(() => {
						slidAnimToValueExchange
							? setSlidAnimToValueExchange(0)
							: setSlidAnimToValueExchange(ITEM_HEIGHT);
					})
				}
				column={true}
			/>
			<Animated.View style={{ height: slidAnimExchange }}>
				{aboutJson.aboutMe.QQ.items.map(item => (
					<MenuListItem
						themeColor={theme}
						name={item.title + ': ' + item.value}
						wrapStyle={{ paddingLeft: 32 }}
						onPress={() => handlePressItem(item)}
					/>
				))}
			</Animated.View>
		</CommonParallaxScrollView>
	);
};

const AuthorScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
}))(observer(AuthorPage)) as unknown) as FC;

export default AuthorScreen;
