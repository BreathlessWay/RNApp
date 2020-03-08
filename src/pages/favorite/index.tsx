import React, { FC } from 'react';
import { inject, observer } from 'mobx-react';

import { Text } from 'react-native';

import { Store } from '@/stores';

import { EFavoriteTab } from '@config/constant';

import Style from './style';

export type FavoritePageStorePropType = Pick<Store, 'favoriteStore'>;

export type FavoritePagePropType = {
	tab: EFavoriteTab;
};

const FavoritePage: FC<FavoritePagePropType &
	FavoritePageStorePropType> = props => {
	return <Text>FavoritePage</Text>;
};

const FavoriteScreen = (inject((stores: Store) => ({
	favoriteStore: stores.favoriteStore,
}))(observer(FavoritePage)) as unknown) as FC<FavoritePagePropType>;

export default FavoriteScreen;
