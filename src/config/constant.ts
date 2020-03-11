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
	{
		title: 'ALl',
		query: 'all',
		checked: true,
	},
	{
		title: 'Unknown',
		query: 'unknown',
		checked: true,
	},
	{
		title: 'Html',
		query: 'html',
		checked: true,
	},
	{
		title: 'CSS',
		query: 'css',
		checked: true,
	},
	{
		title: 'JavaScript',
		query: 'javascript',
		checked: true,
	},
	{
		title: 'Typescript',
		query: 'typescript',
		checked: true,
	},
	{
		title: 'Node',
		query: 'node',
		checked: true,
	},
	{
		title: 'Vue',
		query: 'vue',
		checked: true,
	},
	{
		title: 'React',
		query: 'react',
		checked: true,
	},
	{
		title: 'React Native',
		query: 'react-native',
		checked: true,
	},
];

export const TREND_TABS_LIST = [
	{
		title: '全部用户',
		key: ETrendTab.allUser,
		checked: true,
	},
	{
		title: '国内用户',
		key: ETrendTab.chinaUser,
		checked: true,
	},
	{
		title: '项目',
		key: ETrendTab.repos,
		checked: true,
	},
	{
		title: '趋势',
		key: ETrendTab.trending,
		checked: true,
	},
];

export const PREFIX_URL = 'https://github.com';

export enum EFavoriteTab {
	popular = 'popular',
	trending = 'trending',
}

export const FAVORITE_TABS_LIST = [
	{
		title: '最热',
		key: EFavoriteTab.popular,
	},
	{
		title: '趋势',
		key: EFavoriteTab.trending,
	},
];

export enum EDetailType {
	user = 'user',
	repos = 'repos',
	trending = 'trending',
}
