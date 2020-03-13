import React, { FC, useEffect, useRef, useState } from 'react';
import { inject, observer } from 'mobx-react';

import { useNavigation } from '@react-navigation/native';
// SwipeableFlatList
import {
	View,
	Text,
	TextInput,
	FlatList,
	TouchableHighlight,
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import ReposListItem from '@components/business/ReposListItem';
import CommonFlatList from '@components/business/CommonFlatList';

import { setHeader } from '@components/business/NavHeader';

import { Store } from '@/stores';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/route.d';
import { ReposItemType } from '@/types/repos.d';
import { EFavoriteTab } from '@config/constant';

import Style from './style';

export type SearchPagePropType = Pick<
	Store,
	'appStore' | 'searchStore' | 'popularStore'
>;

const SearchPage: FC<SearchPagePropType> = props => {
	const [add, setAdd] = useState(false);

	const ref = useRef<FlatList<ReposItemType>>();
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	const {
		appStore: { theme },
		searchStore: {
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
		const initialListKey = popularTabList.map(item =>
			item.key.toLocaleLowerCase(),
		);
		const _keyword = keyword.toLocaleLowerCase();
		return initialListKey.includes(_keyword);
	};

	const handleBack = () => {
		navigation.goBack();
	};

	const handleSearch = () => {
		if (!keyword) {
			global.ref.current && global.ref.current.show('请输入关键字');
			return;
		}
		setAdd(!alreadyHas());
		getData({ refreshing: true });
	};

	const handleEndReached = () => {
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
					onChangeText={text => setKeyword(text)}
					value={keyword}
					maxLength={20}
					onSubmitEditing={handleSearch}
					returnKeyType="search"
				/>
			</View>
		),
		right: (
			<View>
				<Text style={Style.btn}>搜索</Text>
			</View>
		),
		left: <IonIcons name={'ios-arrow-back'} size={20} color="#fff" />,
		onPressLeft: handleBack,
		onPressRight: handleSearch,
	});

	return (
		<View style={Style.wrap}>
			<CommonFlatList
				ref={ref as any}
				theme={theme}
				list={list}
				empty={empty}
				hasMore={hasMore}
				loadMore={loadMore}
				refreshing={refreshing}
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
