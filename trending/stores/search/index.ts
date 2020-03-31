import { action, computed, observable, runInAction } from 'mobx';

import * as Qs from 'qs';
import { fetchData } from 'trending/utils/dataStore';

import { ReposItemType } from 'trending/types/repos';

export default class SearchStore {
	@observable
	Cancel_Token: Array<number> = [];

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
	setCancelToken(cancelToken: number) {
		this.Cancel_Token.push(cancelToken);
		this.refreshing = false;
		this.loadMore = false;
	}

	@action.bound
	async getData({
		refreshing = false,
		loadMore = false,
		token,
	}: {
		refreshing?: boolean;
		loadMore?: boolean;
		token?: number;
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

			if (token && this.Cancel_Token.includes(token)) {
				this.Cancel_Token = this.Cancel_Token.filter((item) => item !== token);
			} else {
				runInAction(() => {
					this.refreshing = false;
					this.loadMore = false;
					this.list = refreshing
						? result.items
						: this.list.concat(result.items);
					this.total_count = result.total_count;
				});
			}
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
