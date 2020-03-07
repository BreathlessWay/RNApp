import AppStore from '@stores/app';
import PopularStore from '@stores/popular';
import TrendStore from '@stores/trend';

export class Store {
	readonly appStore = new AppStore();
	readonly popularStore = new PopularStore();
	readonly trendStore = new TrendStore();
}

const store = new Store();

export default store;
