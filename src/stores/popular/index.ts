import { action, computed, observable, runInAction } from 'mobx';
// import { persist } from 'mobx-persist';

import * as Qs from 'qs';
import { fetchData } from '@utils/dataStore';

import { PopularTabItemType, PopularType } from '@stores/popular/popular';

import { PAGE_SIZE } from '@config/constant';

export default class PopularStore {
	// @persist('list')
	@observable
	tabList: Array<PopularTabItemType> = [];

	@observable
	tab: string = '';

	@observable
	pageSize = PAGE_SIZE;

	@observable
	popular: PopularType = {};

	@observable
	refreshing = false;

	@observable
	loadMore = false;

	@action.bound
	initialTab(list: Array<PopularTabItemType>) {
		if (list && list.length) {
			const checkedList = list.filter(item => item.checked);
			if (checkedList && checkedList.length) {
				this.tabList = checkedList;
				this.tab = checkedList[0]?.query;
			}
		}
	}

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
			let pageIndex = this.popular[this.tab]?.pageIndex ?? 1;
			if (refreshing) {
				pageIndex = 1;
			}
			if (loadMore) {
				pageIndex++;
			}

			const params = Qs.stringify({
				q: this.tab,
				sort: 'stars', // stars, forks, or help-wanted-issues
				page: pageIndex,
			});
			const result = await fetchData({
				url: `/search/repositories?${params}`,
			});
			// 在每个 await 之后，状态修改代码应该被包装成动作
			runInAction(() => {
				const _items = this.popular[this.tab]?.items ?? [];
				this.popular[this.tab] = {
					total_count: result.total_count,
					incomplete_results: result.incomplete_results,
					items: refreshing ? result.items : _items.concat(result.items),
					pageIndex,
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

	@computed
	get empty(): boolean {
		if (this.popular) {
			return (this.popular[this.tab]?.total_count ?? 0) === 0;
		}
		return true;
	}

	@computed
	get hasMore(): boolean {
		if (this.popular) {
			const total_count = this.popular[this.tab]?.total_count ?? 0,
				pageIndex = this.popular[this.tab]?.pageIndex ?? 1;
			return total_count > pageIndex * this.pageSize;
		}

		return false;
	}
}
