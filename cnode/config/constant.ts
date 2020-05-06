import { PixelRatio } from 'react-native';

export const BASIC_URL = 'https://cnodejs.org/api/v1';

// 请求缓存有效期 小时
export const MAX_EXPIRE_CACHE = 4;

// tab bar icon size
export const TAR_BAR_ICON_SIZE = 22;

// 边框宽度
export const BORDER_WIDTH = 1 / PixelRatio.get();

// page_size
export const PAGE_SIZE = 10;

// 主题色
export const THEME_COLOR = '#80bd01';

// 列表tag
export enum ETopicsTab {
	All = '',
	Ask = 'ask',
	Share = 'share',
	Job = 'job',
	Good = 'good',
}

// 用户页面主题页面类型
export enum EMyTopicType {
	Posts = 'posts',
	Reply = 'replay',
	Collection = 'collection',
}
