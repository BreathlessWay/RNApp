export type BookItemType = {
	rating: {
		max: number;
		numRaters: number;
		average: string;
		min: number;
	};
	subtitle: string;
	author: Array<string>;
	pubdate: string;
	tags: Array<{
		count: number;
		name: string;
		title: string;
	}>;
	origin_title: string;
	image: string;
	binding: string;
	translator: Array<string>;
	catalog: string;
	pages: string;
	images: {
		small: string;
		large: string;
		medium: string;
	};
	alt: string;
	id: string;
	publisher: string;
	isbn10: string;
	isbn13: string;
	title: string;
	url: string;
	alt_title: string;
	author_intro: string;
	summary: string;
	series: {
		id: string;
		title: string;
	};
	price: string;
};

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
