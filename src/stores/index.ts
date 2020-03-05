import HotStore from '@stores/hot';

export class Store {
	readonly hotStore = new HotStore();
}

export default new Store();
