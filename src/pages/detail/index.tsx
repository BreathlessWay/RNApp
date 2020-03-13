import React, { FC, useCallback, useRef, useState } from 'react';
import { inject, observer } from 'mobx-react';

import {
	RouteProp,
	useFocusEffect,
	useNavigation,
	useRoute,
} from '@react-navigation/native';

import {
	ActivityIndicator,
	BackHandler,
	TouchableOpacity,
	View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';

import { setHeader } from '@components/business/NavHeader';

import { Store } from '@/stores';

import { StackNavigationProp } from '@react-navigation/stack';
import { EScreenName, RootStackParamList } from '@routes/route.d';
import { ReposItemType } from '@stores/popular/popular';
import { WebViewNavigation } from 'react-native-webview/lib/WebViewTypes';
import { TrendingItemType } from '@stores/trend/trend';

import { EFavoriteTab, PREFIX_URL } from '@config/constant';

import Style from './style';

export type DetailPagePropType = Pick<Store, 'appStore' | 'favoriteStore'>;

const DetailPage: FC<DetailPagePropType> = props => {
	const [canGoBack, setCanGoBack] = useState(false);
	const ref = useRef<WebView>();

	const {
		favoriteStore: {
			trendingFavoriteIds,
			popularFavoriteIds,
			setTrendingFavorite,
			setPopularFavorite,
		},
		appStore: { theme },
	} = props;

	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(),
		route = useRoute<RouteProp<RootStackParamList, EScreenName.Detail>>();

	const detail: ReposItemType | TrendingItemType = route.params.item,
		{ source } = route.params;
	let url =
		(detail as ReposItemType).html_url ||
		PREFIX_URL + '/' + (detail as TrendingItemType).full_name;
	if (!url.startsWith('http')) {
		url = PREFIX_URL + url;
	}

	let isFavorite = false;

	if (source === EFavoriteTab.popular) {
		isFavorite = popularFavoriteIds.includes((detail as ReposItemType).id);
	}
	if (source === EFavoriteTab.trending) {
		isFavorite = trendingFavoriteIds.includes(
			(detail as TrendingItemType).full_name,
		);
	}

	const handleStar = () => {
		if (source === EFavoriteTab.popular) {
			setPopularFavorite({
				item: detail as ReposItemType,
				isFavorite: !isFavorite,
			});
		}
		if (source === EFavoriteTab.trending) {
			setTrendingFavorite({
				item: detail as TrendingItemType,
				isFavorite: !isFavorite,
			});
		}
	};

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
		title:
			(detail as TrendingItemType).full_name || (detail as ReposItemType).name,
		right: (
			<View style={Style.right}>
				<TouchableOpacity onPress={handleStar}>
					<FontAwesome
						name={isFavorite ? 'star' : 'star-o'}
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
		left: <IonIcons name={'ios-arrow-back'} size={20} color="#fff" />,
		onPressLeft: handleBack,
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
			renderLoading={() => (
				<ActivityIndicator color={theme} style={Style.loading} />
			)}
		/>
	);
};

const DetailScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
	favoriteStore: stores.favoriteStore,
}))(observer(DetailPage)) as unknown) as FC;

export default DetailScreen;
