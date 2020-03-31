import AppStore from 'trending/stores/app';
import PopularStore from 'trending/stores/popular';
import TrendStore from 'trending/stores/trend';
import FavoriteStore from 'trending/stores/favorite';
import SearchStore from 'trending/stores/search';

export class Store {
	readonly appStore = new AppStore();
	readonly popularStore = new PopularStore();
	readonly trendStore = new TrendStore();
	readonly favoriteStore = new FavoriteStore();
	readonly searchStore = new SearchStore();
}

const store = new Store();

export default store;
