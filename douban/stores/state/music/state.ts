import { MusicStateType } from './type';
import { PAGE_SIZE } from 'douban/config/constant';

export const musicState: MusicStateType = {
	params: {
		q: '',
		start: 0,
		count: PAGE_SIZE,
	},

	total: 0,
	list: [],

	refreshing: false,
	loadMore: false,
	hasMore: true,
	empty: true,
	error: false,
	errMsg: '',
};
