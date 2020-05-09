import { CurrentMovieListType, MovieStateType } from './type';
import { PAGE_SIZE } from 'douban/config/constant';

export const movieState: MovieStateType = {
	type: CurrentMovieListType.Hot,

	params: {
		city: '',
		start: 0,
		tip: PAGE_SIZE,
	},

	list: {
		[CurrentMovieListType.Hot]: {},
		[CurrentMovieListType.Top]: {
			hasMore: true,
			empty: true,
			total: 0,
			list: [],
		},
	},

	refreshing: false,
	loadMore: false,
	error: false,
	errMsg: '',
};
