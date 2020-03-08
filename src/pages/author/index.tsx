import React, { FC } from 'react';
import { inject, observer } from 'mobx-react';

import { useNavigation } from '@react-navigation/native';

import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import IonIcons from 'react-native-vector-icons/Ionicons';

import { Store } from '@/stores';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/route.d';

import Style, { stickyHeaderHeight } from './style';

import aboutJson from '@config/about.json';

import { MENU_LIST } from '@config/menu';

const AuthorPage = () => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	const handleShare = () => {};

	const handleBack = () => {
		navigation.goBack();
	};

	return (
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
							uri: aboutJson.app.avatar,
						}}
					/>
					<Text style={Style.sectionSpeakerText}>{aboutJson.author.name}</Text>
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
			)}></ParallaxScrollView>
	);
};

const AuthorScreen = (inject((stores: Store) => stores)(
	observer(AuthorPage),
) as unknown) as FC;

export default AuthorScreen;
