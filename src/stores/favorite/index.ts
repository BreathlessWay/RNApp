import { action, computed, observable } from 'mobx';
import { persist } from 'mobx-persist';

import { ReposItemType } from '@stores/popular/popular';
import { FavoriteType } from '@stores/favorite/favorite';

import { EFavoriteTab, ETrendTab, PAGE_SIZE } from '@config/constant';

export default class FavoriteStore {
	@persist('list')
	@observable
	popularFavorite: Array<ReposItemType> = [];

	@persist('list')
	@observable
	trendingFavorite: Array<ReposItemType> = [];

	@observable
	favorite: FavoriteType = {} as any;

	@observable
	pageSize = PAGE_SIZE;

	@observable
	tab: EFavoriteTab = EFavoriteTab.popular;

	@observable
	refreshing = false;

	@observable
	loadMore = false;

	@action.bound
	async getList({
		refreshing,
		loadMore,
		tab,
	}: {
		refreshing?: boolean;
		loadMore?: boolean;
		tab: ETrendTab;
	}) {
		try {
			this.refreshing = Boolean(refreshing);
			this.loadMore = Boolean(loadMore);
		} catch (e) {
		} finally {
			this.refreshing = false;
			this.loadMore = false;
		}
	}

	@action.bound
	setPopularFavorite({
		item,
		isFavorite,
	}: {
		item: ReposItemType;
		isFavorite: boolean;
	}) {
		if (isFavorite) {
			this.popularFavorite.push(item);
		} else {
			this.popularFavorite = this.popularFavorite.filter(_ => _.id !== item.id);
		}
	}

	@action.bound
	setTrendingFavorite({
		item,
		isFavorite,
	}: {
		item: ReposItemType;
		isFavorite: boolean;
	}) {
		if (isFavorite) {
			this.trendingFavorite.push(item);
		} else {
			this.trendingFavorite = this.trendingFavorite.filter(
				_ => _.id !== item.id,
			);
		}
	}

	@computed
	get popularFavoriteIds() {
		return this.popularFavorite.map(item => item.id) || [];
	}

	@computed
	get trendingFavoriteIds() {
		return this.trendingFavorite.map(item => item.id) || [];
	}
}
