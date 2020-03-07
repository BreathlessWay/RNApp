// 请求缓存有效期 小时
export const MAX_EXPIRE_CACHE = 4;

export enum ETrendTab {
	allUser = 'allUser',
	chinaUser = 'chinaUser',
	repos = 'repos',
	trending = 'trending',
	trendingDaily = 'trendingDaily',
	trendingWeekly = 'trendingWeekly',
	trendingMonthly = 'trendingMonthly',
}

export const PAGE_SIZE = 10;

export const POPULAR_TABS_LIST = [
	'JavaScript',
	'Typescript',
	'Node',
	'Vue',
	'React',
	'React Native',
];

export const TREND_TABS_LIST = [
	{
		title: '全部用户',
		key: ETrendTab.allUser,
	},
	{
		title: '国内用户',
		key: ETrendTab.chinaUser,
	},
	{
		title: '项目',
		key: ETrendTab.repos,
	},
	{
		title: '趋势',
		key: ETrendTab.trending,
	},
];

export const HEADER_THEME_COLOR = '#00d3f3';

export const PREFIX_URL = 'https://github.com/';
