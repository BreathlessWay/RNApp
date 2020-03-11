import React, { FC, useRef, useState } from 'react';
import { inject, observer } from 'mobx-react';

import { useNavigation } from '@react-navigation/native';

import {
	View,
	Text,
	Image,
	Dimensions,
	TouchableOpacity,
	Clipboard,
	Animated,
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import OctIcons from 'react-native-vector-icons/Octicons';
import MenuListItem from '@components/common/MenuListItem';

import { Store } from '@/stores';

import { StackNavigationProp } from '@react-navigation/stack';
import { EScreenName, RootStackParamList } from '@routes/route.d';

import Style, { stickyHeaderHeight } from './style';

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

	const handleShare = () => {};

	const handleBack = () => {
		navigation.goBack();
	};

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
		<View style={{ flex: 1 }}>
			<ParallaxScrollView
				backgroundColor="#678"
				contentBackgroundColor="#f3f3f4"
				parallaxHeaderHeight={350}
				stickyHeaderHeight={stickyHeaderHeight}
				backgroundScrollSpeed={10}
				renderStickyHeader={() => (
					<View key="sticky-header" style={Style.stickySection}>
						<Text style={Style.stickySectionText}>{aboutJson.author.name}</Text>
					</View>
				)}
				renderBackground={() => (
					<View>
						<Image
							source={{
								uri: aboutJson.author.backgroundImg,
								width: Dimensions.get('window').width,
								height: 350,
							}}
						/>
					</View>
				)}
				renderForeground={() => (
					<View style={Style.parallaxHeader}>
						<Image
							style={Style.avatar}
							source={{
								uri: aboutJson.author.avatar,
							}}
						/>
						<Text style={Style.sectionSpeakerText}>
							{aboutJson.author.name}
						</Text>
						<Text style={Style.sectionTitleText}>
							{aboutJson.author.description}
						</Text>
					</View>
				)}
				renderFixedHeader={() => (
					<View style={Style.fixedSection}>
						<TouchableOpacity onPress={handleBack}>
							<IonIcons name={'ios-arrow-back'} size={20} color="#fff" />
						</TouchableOpacity>
						<TouchableOpacity onPress={handleShare}>
							<IonIcons name={'md-share'} size={20} color="#fff" />
						</TouchableOpacity>
					</View>
				)}>
				<View>
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
				</View>
			</ParallaxScrollView>
		</View>
	);
};

const AuthorScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
}))(observer(AuthorPage)) as unknown) as FC;

export default AuthorScreen;
