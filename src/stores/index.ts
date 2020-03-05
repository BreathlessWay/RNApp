import PopularStore from '@stores/popular';

export class Store {
	readonly popularStore = new PopularStore();
}

const store = new Store();

export default store;
