export enum EScreenName {
	Home = 'Home',

	Book = 'Book',

	BookDetail = 'BookDetail',

	Music = 'Music',

	Movie = 'Movie',

	WebView = 'WebView',
}

export type RootStackParamList = {
	[EScreenName.Home]: {
		title: string;
	};
	[EScreenName.Book]: {
		title: string;
	};
	[EScreenName.Music]: {
		title: string;
	};
	[EScreenName.Movie]: {
		title: string;
	};
	[EScreenName.BookDetail]: {
		title: string;
		id: string;
	};

	[EScreenName.WebView]: {
		title: string;
		url: string;
	};
};
