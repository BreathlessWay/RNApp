export type MovieItemType = {
	rating: {
		max: number;
		average: number;
		details: Record<string, number>;
		stars: string;
		min: number;
	};
	genres: Array<string>;
	title: string;
	casts: Array<{
		avatars: {
			small: string;
			large: string;
			medium: string;
		};
		name_en: string;
		name: string;
		alt: string;
		id: string;
	}>;
	durations: Array<string>;
	collect_count: number;
	mainland_pubdate: string;
	has_video: boolean;
	original_title: string;
	subtype: string;
	directors: Array<{
		avatars: {
			small: string;
			large: string;
			medium: string;
		};
		name_en: string;
		name: string;
		alt: string;
		id: string;
	}>;
	pubdates: Array<string>;
	year: string;
	images: {
		small: string;
		large: string;
		medium: string;
	};
	alt: string;
	id: string;
};

export enum CurrentMovieListType {
	Hot,
	Top,
}

export type MovieStateType = {
	type: CurrentMovieListType;

	params: {
		city: string;
		start: number;
		count: number;
	};

	total: number;
	list: Array<MovieItemType>;

	refreshing: boolean;
	loadMore: boolean;
	hasMore: boolean;
	empty: boolean;
	error: boolean;
	errMsg: string;
};
