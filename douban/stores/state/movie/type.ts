export type MovieStateType = {
	q: string;
	start: number;

	params: {
		q: string;
		start: number;
		count: number;
	};

	list: Array<any>;

	refreshing: boolean;
	loadMore: boolean;
	hasMore: boolean;
	empty: boolean;
	error: boolean;
	errMsg: string;
};
