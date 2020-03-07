import { action, computed, observable, runInAction } from 'mobx';

import { ETrendTab, PAGE_SIZE } from '@config/constant';

import { TrendingType } from './trend.d';

// @ts-ignore
import users from '@wcj/github-rank/dist/users.json';
// @ts-ignore
import chinaUsers from '@wcj/github-rank/dist/users.china.json';
// @ts-ignore
import repos from '@wcj/github-rank/dist/repos.json';
// @ts-ignore
import trendingDaily from '@wcj/github-rank/dist/trending-daily.json';
// @ts-ignore
import trendingWeekly from '@wcj/github-rank/dist/trending-weekly.json';
// @ts-ignore
import trendingMonthly from '@wcj/github-rank/dist/trending-monthly.json';

export default class TrendStore {
	@observable
	trending: TrendingType = {} as any;

	@observable
	pageSize = PAGE_SIZE;

	@observable
	tab: ETrendTab = ETrendTab.allUser;

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
			this.tab = tab;

			let pageIndex = this.trending[this.tab]?.pageIndex ?? 1;

			if (refreshing) {
				pageIndex = 1;
				this.trending[this.tab] = {} as any;
			}

			if (loadMore) {
				pageIndex++;
			}

			const params = {
				pageIndex,
				pageSize: this.pageSize,
				tab,
			};

			const result = await this.fetchData(params);

			runInAction(() => {
				const list = this.trending[tab]?.list ?? [];
				this.trending[tab] = {
					pageIndex,
					list: list.concat(result),
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
		tab: ETrendTab;
	}) {
		let json;
		switch (tab) {
			case ETrendTab.allUser: {
				json = users;
				break;
			}
			case ETrendTab.chinaUser: {
				json = chinaUsers;
				break;
			}
			case ETrendTab.repos: {
				json = repos;
				break;
			}
			case ETrendTab.trendingDaily: {
				json = trendingDaily;
				break;
			}
			case ETrendTab.trendingWeekly: {
				json = trendingWeekly;
				break;
			}
			case ETrendTab.trendingMonthly: {
				json = trendingMonthly;
				break;
			}
		}
		const startIndex = (pageIndex - 1) * pageSize + 1,
			endIndex = pageIndex * pageSize;

		const res = json.slice(startIndex, endIndex);

		return new Promise(resolve => {
			setTimeout(() => {
				resolve(res);
			}, 300);
		});
	}

	@computed
	get listLength() {
		return this.trending[this.tab]?.list?.length ?? 0;
	}

	@computed
	get empty() {
		return this.listLength === 0;
	}

	@computed
	get hasMore() {
		let json;
		switch (this.tab) {
			case ETrendTab.allUser: {
				json = users;
				break;
			}
			case ETrendTab.chinaUser: {
				json = chinaUsers;
				break;
			}
			case ETrendTab.repos: {
				json = repos;
				break;
			}
			case ETrendTab.trendingDaily: {
				json = trendingDaily;
				break;
			}
			case ETrendTab.trendingWeekly: {
				json = trendingWeekly;
				break;
			}
			case ETrendTab.trendingMonthly: {
				json = trendingMonthly;
				break;
			}
		}
		const { pageSize } = this,
			pageIndex = this.trending[this.tab]?.pageIndex ?? 0;
		return pageIndex * pageSize < json.length;
	}
}
