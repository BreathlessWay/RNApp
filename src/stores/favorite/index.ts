import { action, computed, observable, runInAction } from 'mobx';
import { persist } from 'mobx-persist';

import { ReposItemType } from '@stores/popular/popular';
import { FavoriteType } from '@stores/favorite/favorite';

import { EFavoriteTab, PAGE_SIZE } from '@config/constant';
import { TrendingItemType } from '@stores/trend/trend';

export default class FavoriteStore {
	@persist('list')
	@observable
	popularFavorite: Array<ReposItemType> = [];

	@persist('list')
	@observable
	trendingFavorite: Array<TrendingItemType> = [];

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
		tab: EFavoriteTab;
	}) {
		try {
			this.refreshing = Boolean(refreshing);
			this.loadMore = Boolean(loadMore);
			this.tab = tab;

			let pageIndex = this.favorite[this.tab]?.pageIndex ?? 1;
			if (refreshing) {
				pageIndex = 1;
			}
			if (loadMore) {
				pageIndex++;
			}

			const params = {
				pageIndex,
				pageSize: this.pageSize,
				tab: tab,
			};

			const result: any = await this.fetchData(params);
			runInAction(() => {
				const list: Array<any> = this.favorite[tab]?.items ?? [];
				this.favorite[tab] = {
					pageIndex,
					items: refreshing ? result : list.concat(result),
				};
			});
		} catch (e) {
		} finally {
			runInAction(() => {
				this.refreshing = false;
				this.loadMore = false;
			});
		}
	}

	fetchData({
		pageIndex,
		pageSize,
		tab,
	}: {
		pageIndex: number;
		pageSize: number;
		tab: EFavoriteTab;
	}) {
		let list: any = [];

		if (tab === EFavoriteTab.popular) {
			list = this.popularFavorite;
		}

		if (tab === EFavoriteTab.trending) {
			list = this.trendingFavorite;
		}
		const startIndex = (pageIndex - 1) * pageSize,
			endIndex = pageIndex * pageSize;
		const res = list.slice(startIndex, endIndex);

		return new Promise(resolve => {
			setTimeout(() => {
				resolve(res);
			}, 300);
		});
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
			const list = this.favorite[EFavoriteTab.popular].items;
			this.favorite[EFavoriteTab.popular].items = list.filter(
				_ => _.id !== item.id,
			);
		}
	}

	@action.bound
	setTrendingFavorite({
		item,
		isFavorite,
	}: {
		item: TrendingItemType;
		isFavorite: boolean;
	}) {
		if (isFavorite) {
			this.trendingFavorite.push(item);
		} else {
			this.trendingFavorite = this.trendingFavorite.filter(
				_ => _.full_name !== item.full_name,
			);
			const list = this.favorite[EFavoriteTab.trending].items;
			this.favorite[EFavoriteTab.trending].items = list.filter(
				_ => _.full_name !== item.full_name,
			);
		}
	}

	@computed
	get popularFavoriteIds() {
		return this.popularFavorite.map(item => item.id) || [];
	}

	@computed
	get trendingFavoriteIds() {
		return this.trendingFavorite.map(item => item.full_name) || [];
	}

	@computed
	get listLength() {
		return this.favorite[this.tab]?.items?.length ?? 0;
	}

	@computed
	get empty() {
		return this.listLength === 0;
	}

	@computed
	get hasMore() {
		const { pageSize, favorite, tab } = this,
			pageIndex = favorite[tab]?.pageIndex ?? 0;

		let list = [];
		if (tab === EFavoriteTab.popular) {
			list = this.popularFavorite;
		}
		if (tab === EFavoriteTab.trending) {
			list = this.trendingFavorite;
		}
		return pageIndex * pageSize < list.length;
	}
}
