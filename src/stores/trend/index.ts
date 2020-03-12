import { action, computed, observable, runInAction } from 'mobx';
import { persist } from 'mobx-persist';

import { TrendingType } from './trend.d';
import { TabItemType } from '@/types/tab.d';

import { ETrendTab, PAGE_SIZE } from '@config/constant';

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
// @ts-ignore
import kr from '@wcj/github-rank/dist/36kr.json';

export default class TrendStore {
	// @persist('list')
	@observable
	trendTabList: Array<TabItemType> = [];

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

	@observable
	filter = ETrendTab.trendingDaily;

	@action.bound
	initialTrendTab(list: Array<TabItemType>) {
		if (list && list.length) {
			this.trendTabList = list;
			this.tab = list[0]?.key as ETrendTab;
		}
	}

	@action.bound
	setFilter(filter: ETrendTab) {
		this.filter = filter;
	}

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

			let _tab = tab;
			if (tab === ETrendTab.trending) {
				_tab = this.filter;
			}

			let pageIndex = this.trending[_tab]?.pageIndex ?? 1;

			if (refreshing) {
				pageIndex = 1;
			}

			if (loadMore) {
				pageIndex++;
			}

			const params = {
				pageIndex,
				pageSize: this.pageSize,
				tab: _tab,
			};

			const result: any = await this.fetchData(params);

			runInAction(() => {
				const list: Array<any> = this.trending[_tab]?.list ?? [];
				this.trending[_tab] = {
					pageIndex,
					list: refreshing ? result : list.concat(result),
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
		let json = [];
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
				json = repos as Array<any>;
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
			case ETrendTab.kr: {
				json = kr;
				break;
			}
		}
		const startIndex = (pageIndex - 1) * pageSize,
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
		return this.trending[this.trendKey]?.list?.length ?? 0;
	}

	@computed
	get empty() {
		return this.listLength === 0;
	}

	@computed
	get hasMore() {
		let json = [];
		switch (this.trendKey) {
			case ETrendTab.allUser: {
				json = users;
				break;
			}
			case ETrendTab.chinaUser: {
				json = chinaUsers;
				break;
			}
			case ETrendTab.repos: {
				json = repos as Array<any>;
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
			case ETrendTab.kr: {
				json = kr;
				break;
			}
		}
		const { pageSize } = this,
			pageIndex = this.trending[this.tab]?.pageIndex ?? 0;
		return pageIndex * pageSize < json.length;
	}

	@computed
	get trendFilterTab() {
		const { filter } = this;

		return [
			{
				name: '今天',
				key: ETrendTab.trendingDaily,
				active: filter === ETrendTab.trendingDaily,
			},
			{
				name: '本周',
				key: ETrendTab.trendingWeekly,
				active: filter === ETrendTab.trendingWeekly,
			},
			{
				name: '本月',
				key: ETrendTab.trendingMonthly,
				active: filter === ETrendTab.trendingMonthly,
			},
		];
	}

	@computed
	get isTrending() {
		return this.tab === ETrendTab.trending;
	}

	@computed
	get trendKey() {
		return this.isTrending ? this.filter : this.tab;
	}
}
