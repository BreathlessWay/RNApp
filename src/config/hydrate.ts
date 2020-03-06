import { AsyncStorage } from 'react-native';
import { create } from 'mobx-persist';

import AppStore from '@stores/app';

const hydrate = create({
	storage: AsyncStorage, // or AsyncStorage in react-native.
	// default: localStorage
	jsonify: true, // if you use AsyncStorage, here shoud be true
	// default: true
});

const appStore = new AppStore();

hydrate('appStore', appStore).then(() =>
	console.log('appStore has been hydrated'),
);
