import PopularStore from '@stores/popular';
import AppStore from '@stores/app';

export class Store {
	readonly popularStore = new PopularStore();
	readonly appStore = new AppStore();
}

const store = new Store();

export default store;
