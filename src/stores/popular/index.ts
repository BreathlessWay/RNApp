import { action, computed, observable, runInAction } from 'mobx';
import { persist } from 'mobx-persist';

import * as Qs from 'qs';
import { fetchData } from '@utils/dataStore';

import { PopularListType, PopularType } from '@stores/popular/popular';
import { TabItemType } from '@/types/tab.d';

export default class PopularStore {
	@persist('list')
	@observable
	popularTabList: Array<TabItemType> = [];

	@observable
	tab: string = '';

	@observable
	popular: PopularType = {};

	@action.bound
	initialPopularTab(list: Array<TabItemType>) {
		if (list && list.length) {
			this.popularTabList = list;
			this.tab = list[0]?.key;
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
			this.tab = tab;
			let pageIndex = this.popular[this.tab]?.pageIndex ?? 1;
			if (!this.popular[this.tab]) {
				this.popular[this.tab] = {} as PopularListType;
			}
			this.popular[this.tab].refreshing = refreshing;
			this.popular[this.tab].loadMore = loadMore;

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
					refreshing: false,
					loadMore: false,
				};
			});
		} catch (e) {
		} finally {
			runInAction(() => {
				this.popular[this.tab].refreshing = false;
				this.popular[this.tab].loadMore = false;
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
				listLength = this.popular[this.tab]?.items?.length ?? 0;

			return total_count > listLength;
		}

		return false;
	}

	@computed
	get refreshing() {
		return this.popular[this.tab]?.refreshing ?? false;
	}

	@computed
	get loadMore() {
		return this.popular[this.tab]?.loadMore ?? false;
	}

	@computed
	get showTabList() {
		return this.popularTabList.filter(item => item.checked);
	}
}
