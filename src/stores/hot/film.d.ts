export type FileItemType = {
	id: string;
	title: string;
	year: 1996;
	mpaa_rating: string;
	runtime: 106;
	release_dates: {
		theater: string;
		dvd: string;
	};
	ratings: {
		critics_rating: string;
		critics_score: 16;
		audience_rating: string;
		audience_score: 27;
	};
	synopsis: string;
	posters: {
		thumbnail: string;
		profile: string;
		detailed: string;
		original: string;
	};
	abridged_cast: Array<{
		name: string;
		id: string;
		characters: Array<string>;
	}>;
	alternate_ids: {
		imdb: string;
	};
	links: {
		self: string;
		alternate: string;
		cast: string;
		reviews: string;
		similar: string;
	};
};

export type FileListType = Array<FileItemType>;
