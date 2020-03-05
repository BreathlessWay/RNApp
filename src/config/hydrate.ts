import { AsyncStorage } from 'react-native';
import { create } from 'mobx-persist';

import PopularStore from '@stores/popular';
import AppStore from '@stores/app';

const hydrate = create({
	storage: AsyncStorage, // or AsyncStorage in react-native.
	// default: localStorage
	jsonify: true, // if you use AsyncStorage, here shoud be true
	// default: true
});

const popularStore = new PopularStore();
const appStore = new AppStore();

hydrate('popularStore', popularStore).then(() =>
	console.log('popularStore has been hydrated'),
);
hydrate('appStore', appStore).then(() =>
	console.log('appStore has been hydrated'),
);
