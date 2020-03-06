import { action, computed, observable, runInAction } from 'mobx';

import { PAGE_SIZE, TABS_LIST } from '@config/constant';
import { PopularType } from '@stores/popular/popular';

import * as Qs from 'qs';
import { fetchData } from '@utils/dataStore';

export default class PopularStore {
	@observable
	tab: string = TABS_LIST[0];

	@observable
	pageIndex = 1;

	@observable
	pageSize = PAGE_SIZE;

	@observable
	popular: PopularType = {};

	@observable
	refreshing = false;

	@observable
	loadMore = false;

	@action.bound
	async getData({
		refreshing = false,
		loadMore = false,
		tab,
	}: {
		refreshing?: boolean;
		loadMore?: boolean;
		tab: string;
	}) {
		try {
			this.refreshing = refreshing;
			this.loadMore = loadMore;
			this.tab = tab;
			if (refreshing) {
				this.pageIndex = 1;
			}
			const result = await fetchData({
				url: `/search/repositories?${this.params}`,
			});
			runInAction(() => {
				this.popular[this.tab] = result;
			});
		} catch (e) {}
	}

	@computed
	get params() {
		return Qs.stringify({
			q: this.tab,
			sort: 'stars', // stars, forks, or help-wanted-issues
		});
	}

	@computed
	get empty(): boolean {
		if (this.popular) {
			return this.popular[this.tab].total_count === 0;
		}
		return true;
	}

	@computed
	get hasMore(): boolean {
		if (this.popular) {
			return (
				this.popular[this.tab].total_count > this.pageIndex * this.pageSize
			);
		}

		return true;
	}
}
