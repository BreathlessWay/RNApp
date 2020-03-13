import React, { FC, useEffect, useRef } from 'react';
import { inject, observer } from 'mobx-react';

import { useNavigation } from '@react-navigation/native';

import { View, Text, TextInput, FlatList } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';

import { setHeader } from '@components/business/NavHeader';

import { Store } from '@/stores';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/route.d';

import Style from './style';
import Feather from 'react-native-vector-icons/Feather';
import ReposListItem from '@components/business/ReposListItem';
import { ReposItemType } from '@/types/repos';
import { EFavoriteTab } from '@config/constant';
import CommonFlatList from '@components/business/CommonFlatList';

export type SearchPagePropType = Pick<Store, 'appStore' | 'searchStore'>;

const SearchPage: FC<SearchPagePropType> = props => {
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
	} = props;

	const handleBack = () => {
		navigation.goBack();
	};

	const handleSearch = () => {
		if (!keyword) {
			global.ref.current && global.ref.current.show('请输入关键字');
			return;
		}
		getData({ refreshing: true });
	};

	const handleEndReached = () => {
		getData({ loadMore: true });
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
	);
};

const SearchScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
	searchStore: stores.searchStore,
}))(observer(SearchPage)) as unknown) as FC;

export default SearchScreen;
