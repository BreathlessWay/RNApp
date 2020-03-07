import { ETrendTab } from '@config/constant';

export type TrendingType = {
	[ETrendTab.allUser]: {
		pageIndex: number;
		list: Array<any>;
	};
	[ETrendTab.chinaUser]: {
		pageIndex: number;
		list: Array<any>;
	};
	[ETrendTab.repos]: {
		pageIndex: number;
		list: Array<any>;
	};
	[ETrendTab.trendingDaily]: {
		pageIndex: number;
		list: Array<any>;
	};
	[ETrendTab.trendingWeekly]: {
		pageIndex: number;
		list: Array<any>;
	};
	[ETrendTab.trendingMonthly]: {
		pageIndex: number;
		list: Array<any>;
	};
};
