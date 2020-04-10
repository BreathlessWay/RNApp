export type BookItemType = {};

export type BookStateType = {
	params: {
		q: string;
		start: number;
		count: number;
	};

	total: number;
	list: Array<BookItemType>;

	refreshing: boolean;
	loadMore: boolean;
	hasMore: boolean;
	empty: boolean;
	error: boolean;
	errMsg: string;
};
