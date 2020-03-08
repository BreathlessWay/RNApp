import AppStore from '@stores/app';
import PopularStore from '@stores/popular';
import TrendStore from '@stores/trend';
import FavoriteStore from '@stores/favorite';

export class Store {
	readonly appStore = new AppStore();
	readonly popularStore = new PopularStore();
	readonly trendStore = new TrendStore();
	readonly favoriteStore = new FavoriteStore();
}

const store = new Store();

export default store;
