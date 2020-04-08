export enum EScreenName {
	Home = 'Home',

	Book = 'Book',

	Music = 'Music',

	Movie = 'Movie',

	WebView = 'WebView',

	About = 'About',
}

export type RootStackParamList = {
	[EScreenName.Home]: undefined;
	[EScreenName.Book]: undefined;
	[EScreenName.Music]: undefined;
	[EScreenName.Movie]: undefined;
	[EScreenName.About]: undefined;

	[EScreenName.WebView]: {
		url: string;
		title: string;
	};
};
