export enum EScreenName {
	Home = 'Home',

	Book = 'Book',

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

	[EScreenName.WebView]: {
		title: string;
		url: string;
	};
};
