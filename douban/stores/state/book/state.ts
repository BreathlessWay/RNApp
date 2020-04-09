import { BookState } from './type';

import { PAGE_SIZE } from 'douban/config/constant';

export const bookState: BookState = {
	q: 'javascript',
	start: 0,
	count: PAGE_SIZE,
	list: [],

	refreshing: false,
	loadMore: false,
	hasMore: false,
	empty: true,
	error: false,
	errMsg: '',
};
