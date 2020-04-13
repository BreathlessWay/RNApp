export type MusicStateType = {
	params: {
		q: string;
		start: number;
		count: number;
	};

	total: number;
	list: Array<any>;

	refreshing: boolean;
	loadMore: boolean;
	hasMore: boolean;
	empty: boolean;
	error: boolean;
	errMsg: string;
};
