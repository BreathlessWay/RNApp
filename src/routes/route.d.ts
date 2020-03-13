import { EPageSource, EFavoriteTab } from '@config/constant';

export enum EScreenName {
	Welcome = 'Welcome',

	Switch = 'Switch',
	Me = 'Me',
	Favorite = 'Favorite',

	Trend = 'Trend',

	Popular = 'Popular',

	Detail = 'Detail',

	About = 'About',

	Author = 'Author',

	WebView = 'WebView',

	Edit = 'Edit',

	Sort = 'Sort',

	Theme = 'Theme',

	Search = 'Search',
}

export type RootStackParamList = {
	[EScreenName.Welcome]: undefined;
	[EScreenName.Switch]: undefined;
	[EScreenName.Trend]: Record<any, any>;
	[EScreenName.Me]: undefined;
	[EScreenName.Favorite]: undefined;
	[EScreenName.Popular]: undefined;
	[EScreenName.PopularIndex]: undefined;
	[EScreenName.Detail]: {
		item: any;
		source: EFavoriteTab;
	};
	[EScreenName.About]: undefined;
	[EScreenName.Author]: undefined;
	[EScreenName.WebView]: {
		url: string;
		title: string;
	};
	[EScreenName.Edit]: {
		title: string;
		type: EPageSource;
	};
	[EScreenName.Sort]: {
		title: string;
		type: EPageSource;
	};
	[EScreenName.Theme]: undefined;
	[EScreenName.Search]: undefined;
};
