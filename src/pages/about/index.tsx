import React, { FC, useRef } from 'react';
import { inject, observer } from 'mobx-react';

import { useNavigation } from '@react-navigation/native';

import {
	View,
	Text,
	Image,
	Dimensions,
	TouchableOpacity,
	Linking,
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import IonIcons from 'react-native-vector-icons/Ionicons';
import OctIcons from 'react-native-vector-icons/Octicons';
import MenuListItem from '@components/business/MenuListItem';

import { Store } from '@/stores';

import { StackNavigationProp } from '@react-navigation/stack';
import { EScreenName, RootStackParamList } from '@routes/route.d';

import Style, { stickyHeaderHeight } from './style';

import aboutJson from '@config/about.json';

import { MENU_LIST } from '@config/menu';

const AboutPage = () => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	const handleShare = () => {};

	const handleBack = () => {
		navigation.goBack();
	};

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
		<View style={{ flex: 1 }}>
			<ParallaxScrollView
				backgroundColor="#678"
				contentBackgroundColor="#f3f3f4"
				parallaxHeaderHeight={350}
				stickyHeaderHeight={stickyHeaderHeight}
				backgroundScrollSpeed={10}
				renderStickyHeader={() => (
					<View key="sticky-header" style={Style.stickySection}>
						<Text style={Style.stickySectionText}>{aboutJson.app.name}</Text>
					</View>
				)}
				renderBackground={() => (
					<View>
						<Image
							source={{
								uri: aboutJson.app.backgroundImg,
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
								uri: aboutJson.app.avatar,
							}}
						/>
						<Text style={Style.sectionSpeakerText}>{aboutJson.app.name}</Text>
						<Text style={Style.sectionTitleText}>
							{aboutJson.app.description}
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
				<MenuListItem
					{...MENU_LIST.About_Author}
					onPress={() => navigation.navigate(EScreenName.Author)}
				/>
				<MenuListItem
					name="项目地址"
					Icons={OctIcons}
					icon="project"
					onPress={() =>
						navigation.navigate(EScreenName.WebView, {
							title: aboutJson.info.name,
							url: aboutJson.info.url,
						})
					}
				/>
				<MenuListItem
					{...MENU_LIST.Feedback}
					hasBorder={false}
					onPress={handleFeedback}
				/>
			</ParallaxScrollView>
		</View>
	);
};

const AboutScreen = (inject((stores: Store) => stores)(
	observer(AboutPage),
) as unknown) as FC;

export default AboutScreen;
