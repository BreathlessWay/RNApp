import React, { FC, useEffect, useRef, useState } from 'react';
import { inject, observer } from 'mobx-react';

import { useNavigation } from '@react-navigation/native';
import {
	View,
	Text,
	TextInput,
	FlatList,
	TouchableHighlight,
	ActivityIndicator,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import ReposListItem from 'trending/components/business/ReposListItem';
import CommonFlatList from 'trending/components/business/CommonFlatList';

import { setHeader } from 'trending/components/business/NavHeader';

import { Store } from 'trending/stores';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'trending/routes/route.d';
import { ReposItemType } from 'trending/types/repos.d';
import { EFavoriteTab } from 'trending/config/constant';

import Style from './style';

export type SearchPagePropType = Pick<
	Store,
	'appStore' | 'searchStore' | 'popularStore'
>;

let token: number | null = null;

const SearchPage: FC<SearchPagePropType> = (props) => {
	const [add, setAdd] = useState(false);

	const ref = useRef<FlatList<ReposItemType>>();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	const {
		appStore: { theme },
		searchStore: {
			setCancelToken,
			keyword,
			setKeyword,
			getData,
			empty,
			loadMore,
			hasMore,
			refreshing,
			list,
		},
		popularStore: { popularTabList, addPopularTab },
	} = props;

	const alreadyHas = () => {
		const initialListKey = popularTabList.map((item) =>
			item.key.toLocaleLowerCase(),
		);
		const _keyword = keyword.toLocaleLowerCase();
		return initialListKey.includes(_keyword);
	};

	const handleBack = () => {
		navigation.goBack();
	};

	const handleSearch = () => {
		if (loadMore) {
			return;
		}
		if (!keyword) {
			global.ref.current && global.ref.current.show('请输入关键字');
			return;
		}
		if (refreshing) {
			token && setCancelToken(token);
		} else {
			setAdd(!alreadyHas());
			token = Date.now();
			getData({ refreshing: true, token });
		}
	};

	const handleEndReached = () => {
		if (refreshing || empty || !hasMore || loadMore) {
			return;
		}
		getData({ loadMore: true });
	};

	const handleAddTab = () => {
		addPopularTab(keyword);
		setAdd(!alreadyHas());
	};

	useEffect(() => {
		return () => {
			setKeyword('');
		};
	}, [ref]);

	setHeader({
		navigation,
		header: (
			<View style={Style.search}>
				<Feather name="search" size={16} color="#fff" />
				<TextInput
					selectionColor={'#fff'}
					placeholder="请收入搜索关键字"
					placeholderTextColor={'#fff'}
					clearButtonMode="while-editing"
					autoCapitalize="none"
					numberOfLines={1}
					autoFocus={true}
					style={Style.input}
					onChangeText={(text) => setKeyword(text)}
					value={keyword}
					maxLength={20}
					onSubmitEditing={handleSearch}
					returnKeyType="search"
				/>
			</View>
		),
		right: (
			<View>
				<Text style={Style.btn}>{refreshing ? '取消' : '搜索'}</Text>
			</View>
		),
		left: <IonIcons name={'ios-arrow-back'} size={20} color="#fff" />,
		onPressLeft: handleBack,
		onPressRight: handleSearch,
	});

	return refreshing ? (
		<ActivityIndicator color={theme} style={Style.loading} />
	) : (
		<View style={Style.wrap}>
			<CommonFlatList
				needRefresh={false}
				ref={ref as any}
				theme={theme}
				list={list}
				empty={empty}
				hasMore={hasMore}
				loadMore={loadMore}
				refreshing={false}
				onEndReached={handleEndReached}
				onRefresh={handleSearch}
				renderItem={({ item }) => {
					return (
						<ReposListItem
							{...(item as ReposItemType)}
							source={EFavoriteTab.popular}
							theme={theme}
							showFavorite={false}
						/>
					);
				}}
			/>
			{add && (
				<TouchableHighlight
					underlayColor={'#999'}
					onPress={handleAddTab}
					style={{ ...Style.add, backgroundColor: theme }}>
					<View style={Style.addWrap}>
						<Text style={Style.addName}>添加到语言</Text>
					</View>
				</TouchableHighlight>
			)}
		</View>
	);
};

const SearchScreen = (inject((stores: Store) => ({
	popularStore: stores.popularStore,
	appStore: stores.appStore,
	searchStore: stores.searchStore,
}))(observer(SearchPage)) as unknown) as FC;

export default SearchScreen;
