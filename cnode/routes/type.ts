export enum EScreenName {
	Home = 'Home',

	All = 'All',
	Ask = 'Ask',
	Share = 'Share',
	Job = 'Job',
	Good = 'Good',

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
	[EScreenName.Home]: {
		tab: string;
	};
	[EScreenName.All]: {
		tab: '';
	};
	[EScreenName.Ask]: {
		tab: 'ask';
	};
	[EScreenName.Share]: {
		tab: 'share';
	};
	[EScreenName.Job]: {
		tab: 'job';
	};
	[EScreenName.Good]: {
		tab: 'good';
	};

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
