import { BookState } from './type';

import { PAGE_SIZE } from 'douban/config/constant';

export const bookState: BookState = {
	q: 'javascript',
	start: 0,

	get params() {
		return {
			q: bookState.q,
			start: bookState.start,
			count: PAGE_SIZE,
		};
	},
	list: [],

	refreshing: false,
	loadMore: false,
	hasMore: true,
	empty: true,
	error: false,
	errMsg: '',
};
