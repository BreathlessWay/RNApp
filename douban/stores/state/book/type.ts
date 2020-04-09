export type BookItemType = {};

export type BookState = {
	q: string;
	start: number;
	count: number;
	list: Array<BookItemType>;

	refreshing: boolean;
	loadMore: boolean;
	hasMore: boolean;
	empty: boolean;
	error: boolean;
	errMsg: string;
};
