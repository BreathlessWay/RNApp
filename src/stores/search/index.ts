import { action, computed, observable, runInAction } from 'mobx';

import * as Qs from 'qs';
import { fetchData } from '@utils/dataStore';

import { ReposItemType } from '@/types/repos';

export default class SearchStore {
	@observable
	refreshing = false;

	@observable
	loadMore = false;

	@observable
	list: Array<ReposItemType> = [];

	@observable
	total_count = 0;

	@observable
	keyword = '';

	@observable
	pageIndex = 1;

	@action.bound
	async getData({
		refreshing = false,
		loadMore = false,
	}: {
		refreshing?: boolean;
		loadMore?: boolean;
	}) {
		try {
			this.refreshing = Boolean(refreshing);
			this.loadMore = Boolean(loadMore);

			if (refreshing) {
				this.pageIndex = 1;
			}
			if (loadMore) {
				this.pageIndex++;
			}

			const result = await fetchData({
				url: `/search/repositories?${this.query}`,
			});

			runInAction(() => {
				this.refreshing = false;
				this.loadMore = false;
				this.list = refreshing ? result.items : this.list.concat(result.items);
				this.total_count = result.total_count;
			});
		} catch (e) {
		} finally {
			runInAction(() => {
				this.refreshing = false;
				this.loadMore = false;
			});
		}
	}

	@action.bound
	setKeyword(keyword: string) {
		this.keyword = keyword;
	}

	@computed
	get empty(): boolean {
		return this.list.length === 0;
	}

	@computed
	get hasMore(): boolean {
		return this.list.length < this.total_count;
	}

	@computed
	get query() {
		return Qs.stringify({
			q: this.keyword,
			page: this.pageIndex,
			sort: 'stars',
		});
	}
}
