import React, { FC, useCallback, useRef, useState } from 'react';
import { inject, observer } from 'mobx-react';

import {
	useNavigation,
	useRoute,
	RouteProp,
	useFocusEffect,
} from '@react-navigation/native';

import { View, TouchableOpacity, BackHandler } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';

import { setHeader } from '@components/business/NavHeader';

import { Store } from '@/stores';

import { StackNavigationProp } from '@react-navigation/stack';
import { EScreenName, RootStackParamList } from '@routes/route.d';
import { ReposItemType } from '@stores/popular/popular';
import { WebViewNavigation } from 'react-native-webview/lib/WebViewTypes';

import { PREFIX_URL } from '@config/constant';

import Style from './style';

const DetailPage: FC = () => {
	const [canGoBack, setCanGoBack] = useState(false);
	const ref = useRef<WebView>();

	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(),
		route = useRoute<RouteProp<RootStackParamList, EScreenName.Detail>>();

	const detail: ReposItemType = route.params.item;

	const url = detail.html_url || PREFIX_URL + detail.full_name;

	const handleStar = () => {};

	const handleShare = () => {};

	const handleBack = () => {
		if (canGoBack) {
			ref.current && ref.current.goBack();
		} else {
			navigation.goBack();
		}
	};

	const onBackPress = () => {
		handleBack();
		// Returning true from onBackPress denotes that we have handled the event,
		// and react-navigation's listener will not get called,
		// thus not popping the screen.
		// Returning false will cause the event to bubble up and react-navigation's listener will pop the screen.
		return true;
	};

	const handleNavigationStateChange = (e: WebViewNavigation) => {
		setCanGoBack(e.canGoBack);
	};

	setHeader({
		navigation,
		title: detail.full_name || detail.name,
		right: (
			<View style={Style.right}>
				<TouchableOpacity onPress={handleStar}>
					<FontAwesome
						name={'star-o'}
						size={20}
						color="#fff"
						style={Style.star}
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleShare}>
					<IonIcons name={'md-share'} size={20} color="#fff" />
				</TouchableOpacity>
			</View>
		),
		left: (
			<TouchableOpacity onPress={handleBack}>
				<IonIcons name={'ios-arrow-back'} size={20} color="#fff" />
			</TouchableOpacity>
		),
	});
	// 安卓物理返回键处理
	useFocusEffect(
		useCallback(() => {
			BackHandler.addEventListener('hardwareBackPress', onBackPress);
			return () =>
				BackHandler.removeEventListener('hardwareBackPress', onBackPress);
		}, [canGoBack]),
	);

	return (
		<WebView
			ref={ref as any}
			source={{ uri: url }}
			onNavigationStateChange={handleNavigationStateChange}
			startInLoadingState={true}
		/>
	);
};

const DetailScreen = (inject((stores: Store) => stores)(
	observer(DetailPage),
) as unknown) as FC;

export default DetailScreen;
