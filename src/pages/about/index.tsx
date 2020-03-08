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
import Toast from 'react-native-easy-toast';
import MenuListItem from '@components/business/MenuListItem';

import { Store } from '@/stores';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/route.d';

import Style, { stickyHeaderHeight } from './style';

import aboutJson from '@config/about.json';

import { MENU_LIST } from '@config/menu';

const AboutPage = () => {
	const ref = useRef<Toast>();
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
			ref.current && ref.current.show(e.message);
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
				<MenuListItem {...MENU_LIST.Tutorial} />
				<MenuListItem {...MENU_LIST.About_Author} />
				<MenuListItem
					{...MENU_LIST.Feedback}
					hasBorder={false}
					onPress={handleFeedback}
				/>
			</ParallaxScrollView>
			<Toast ref={ref as any} position="top" positionValue={300} />
		</View>
	);
};

const AboutScreen = (inject((stores: Store) => stores)(
	observer(AboutPage),
) as unknown) as FC;

export default AboutScreen;
