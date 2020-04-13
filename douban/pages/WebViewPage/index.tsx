import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import {
	RouteProp,
	useFocusEffect,
	useNavigation,
	useRoute,
} from '@react-navigation/native';

import {
	ActivityIndicator,
	Alert,
	Text,
	BackHandler,
	TouchableOpacity,
} from 'react-native';
import WebView from 'react-native-webview';

import { WebViewNavigation } from 'react-native-webview/lib/WebViewTypes';
import { StackNavigationProp, HeaderBackButton } from '@react-navigation/stack';

import { EScreenName, RootStackParamList } from 'douban/routes/type';

import Style from './style';
import IonIcons from 'react-native-vector-icons/Ionicons';

export type WebViewPagePropType = {};

const WebViewPage: FC<WebViewPagePropType> = () => {
	const [canGoBack, setCanGoBack] = useState(false),
		ref = useRef<WebView>();

	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(),
		route = useRoute<RouteProp<RootStackParamList, EScreenName.WebView>>();

	const { url, title } = route.params;

	if (url && url.startsWith('http')) {
	} else {
		Alert.alert(
			'错误',
			'url参数异常',
			[{ text: '返回', onPress: () => navigation.goBack() }],
			{ cancelable: false },
		);
		return null;
	}

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

	useEffect(() => {
		navigation.setOptions({
			title,
			headerLeft: (props) => {
				return (
					<TouchableOpacity onPress={handleBack} style={Style.back}>
						<IonIcons
							name={'ios-arrow-back'}
							size={26}
							color={props.tintColor}
						/>
					</TouchableOpacity>
				);
			},
		});
	}, [canGoBack]);

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
			renderLoading={() => <ActivityIndicator style={Style.loading} />}
		/>
	) : null;
};

export default WebViewPage;
