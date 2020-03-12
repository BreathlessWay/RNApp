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
	kr = '36kr',
}

export const PAGE_SIZE = 10;

export const POPULAR_TABS_LIST = [
	{
		title: 'ALl',
		query: 'stars:>1',
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
		checked: false,
	},
	{
		title: 'JavaScript',
		query: 'javascript',
		checked: false,
	},
	{
		title: 'Typescript',
		query: 'typescript',
		checked: false,
	},
	{
		title: 'Node',
		query: 'node',
		checked: false,
	},
	{
		title: 'Vue',
		query: 'vue',
		checked: false,
	},
	{
		title: 'React',
		query: 'react',
		checked: false,
	},
	{
		title: 'React Native',
		query: 'react-native',
		checked: false,
	},
	{
		title: 'Dart',
		query: 'dart',
		checked: false,
	},
	{
		title: 'Flutter',
		query: 'flutter',
		checked: false,
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
	{
		title: '36氪',
		key: ETrendTab.kr,
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
	kr = '36kr',
}
