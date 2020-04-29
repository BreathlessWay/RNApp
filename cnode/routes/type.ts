export enum EScreenName {
	Home = 'Home',

	Me = 'Me',

	Detail = 'Detail',

	WebView = 'WebView',
}

export type RootStackParamList = {
	[EScreenName.Home]: undefined;
	[EScreenName.Me]: undefined;
	[EScreenName.Detail]: {
		item: any;
	};
	[EScreenName.WebView]: {
		url: string;
		title: string;
	};
};
