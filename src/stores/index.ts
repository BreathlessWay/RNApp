import HomeStore from '@stores/home';

export class Store {
	readonly homeStore = new HomeStore();
}

export default new Store();
