import AsyncStorage from '@react-native-community/async-storage';
import { create } from 'mobx-persist';

import store from 'trending/stores';

const hydrate = create({
	storage: AsyncStorage, // or AsyncStorage in react-native.
	// default: localStorage
	jsonify: true, // if you use AsyncStorage, here shoud be true
	// default: true
});

hydrate('store_appStore', store.appStore).then(() =>
	console.log('appStore has been hydrated'),
);

hydrate('store_popularStore', store.popularStore).then(() =>
	console.log('popularStore has been hydrated'),
);

hydrate('store_trendStore', store.trendStore).then(() =>
	console.log('trendStore has been hydrated'),
);

hydrate('store_favoriteStore', store.favoriteStore).then(() =>
	console.log('favoriteStore has been hydrated'),
);
