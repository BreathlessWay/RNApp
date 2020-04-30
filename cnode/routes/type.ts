export enum EScreenName {
	Home = 'Home',

	Me = 'Me',

	Message = 'Message',

	Posts = 'Posts',

	Reply = 'Replay',

	Collection = 'Collection',

	Detail = 'Detail',

	WebView = 'WebView',

	Scan = 'Scan',
}

export type RootStackParamList = {
	[EScreenName.Home]: undefined;
	[EScreenName.Me]: undefined;
	[EScreenName.Message]: undefined;
	[EScreenName.Posts]: undefined;
	[EScreenName.Reply]: undefined;
	[EScreenName.Collection]: undefined;
	[EScreenName.Scan]: undefined;
	[EScreenName.Detail]: {
		item: any;
	};
	[EScreenName.WebView]: {
		url: string;
		title: string;
	};
};
