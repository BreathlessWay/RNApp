import PopularStore from '@stores/popular';

export class Store {
	readonly popularStore = new PopularStore();
}

export default new Store();
