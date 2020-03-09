import React, { FC, useCallback, useRef, useState } from 'react';
import { inject, observer } from 'mobx-react';

import {
	RouteProp,
	useFocusEffect,
	useNavigation,
	useRoute,
} from '@react-navigation/native';

import { Alert, BackHandler } from 'react-native';
import WebView from 'react-native-webview';
import IonIcons from 'react-native-vector-icons/Ionicons';

import { setHeader } from '@components/business/NavHeader';

import { Store } from '@/stores';

import { WebViewNavigation } from 'react-native-webview/lib/WebViewTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import { EScreenName, RootStackParamList } from '@routes/route.d';

const WebViewPage: FC = () => {
	const [canGoBack, setCanGoBack] = useState(false),
		ref = useRef<WebView>();

	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(),
		route = useRoute<RouteProp<RootStackParamList, EScreenName.WebView>>();

	const { url, title } = route.params;

	if (url && url.startsWith('http')) {
	} else {
		Alert.alert(
			'url参数异常',
			'',
			[{ text: '返回', onPress: () => navigation.goBack() }],
			{ cancelable: false },
		);
	}

	const handleShare = () => {};

	const handleBack = () => {
		if (canGoBack) {
			ref.current && ref.current.goBack();
		} else {
			navigation.goBack();
		}
	};

	const handleNavigationStateChange = (e: WebViewNavigation) => {
		setCanGoBack(e.canGoBack);
	};

	const onBackPress = () => {
		handleBack();
		// Returning true from onBackPress denotes that we have handled the event,
		// and react-navigation's listener will not get called,
		// thus not popping the screen.
		// Returning false will cause the event to bubble up and react-navigation's listener will pop the screen.
		return true;
	};

	setHeader({
		navigation,
		title,
		right: <IonIcons name={'md-share'} size={20} color="#fff" />,
		left: <IonIcons name={'ios-arrow-back'} size={20} color="#fff" />,
		onPressLeft: handleBack,
		onPressRight: handleShare,
	});

	// 安卓物理返回键处理
	useFocusEffect(
		useCallback(() => {
			BackHandler.addEventListener('hardwareBackPress', onBackPress);
			return () =>
				BackHandler.removeEventListener('hardwareBackPress', onBackPress);
		}, [canGoBack]),
	);

	return url ? (
		<WebView
			ref={ref as any}
			source={{ uri: url }}
			onNavigationStateChange={handleNavigationStateChange}
			startInLoadingState={true}
		/>
	) : null;
};

const WebViewScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
}))(observer(WebViewPage)) as unknown) as FC;

export default WebViewScreen;
