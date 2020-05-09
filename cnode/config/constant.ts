import { PixelRatio } from 'react-native';

export const BASIC_URL = 'https://cnodejs.org/api/v1';

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

// 消息已读未读
export enum EMessageTab {
	Read = 'has_read_messages',
	Unread = 'hasnot_read_messages',
}
