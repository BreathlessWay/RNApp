import React, { FC } from 'react';

import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';

import IonIcons from 'react-native-vector-icons/Ionicons';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import Style, { stickyHeaderHeight } from './style';

export type CommonParallaxScrollViewPropType = {
	title: string;
	name: string;
	imageUrl: string;
	avatarUrl: string;
	description: string;
	navigation: any;
};

const CommonParallaxScrollView: FC<CommonParallaxScrollViewPropType> = props => {
	const {
		children,
		navigation,
		imageUrl,
		name,
		avatarUrl,
		title,
		description,
	} = props;

	const handleShare = () => {};

	const handleBack = () => {
		navigation.goBack();
	};

	return (
		<ParallaxScrollView
			parallaxHeaderHeight={350}
			stickyHeaderHeight={stickyHeaderHeight}
			backgroundScrollSpeed={10}
			renderStickyHeader={() => (
				<View key="sticky-header" style={Style.stickySection}>
					<Text style={Style.stickySectionText}>{title}</Text>
				</View>
			)}
			renderBackground={() => (
				<View>
					<Image
						source={{
							uri: imageUrl,
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
							uri: avatarUrl,
						}}
					/>
					<Text style={Style.sectionSpeakerText}>{name}</Text>
					<Text style={Style.sectionTitleText}>{description}</Text>
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
			{children}
		</ParallaxScrollView>
	);
};

export default CommonParallaxScrollView;
