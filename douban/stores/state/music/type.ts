export type MusicItemType = {
	rating: {
		max: number;
		average: string;
		numRaters: number;
		min: number;
	};
	author: Array<{
		name: string;
	}>;
	alt_title: string;
	image: string;
	tags: Array<{
		count: number;
		name: string;
	}>;
	mobile_link: string;
	attrs: {
		publisher: Array<string>;
		singer: Array<string>;
		version: Array<string>;
		pubdate: Array<string>;
		title: Array<string>;
		media: Array<string>;
		tracks: Array<string>;
		discs: Array<string>;
	};
	title: string;
	alt: string;
	id: string;
};

export type MusicStateType = {
	params: {
		q: string;
		start: number;
		count: number;
	};

	total: number;
	list: Array<MusicItemType>;

	refreshing: boolean;
	loadMore: boolean;
	hasMore: boolean;
	empty: boolean;
	error: boolean;
	errMsg: string;
};
