import { ETopicsTab } from 'cnode/config/constant';

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
		tab: ETopicsTab;
	};
	[EScreenName.All]: {
		tab: ETopicsTab.All;
	};
	[EScreenName.Ask]: {
		tab: ETopicsTab.Ask;
	};
	[EScreenName.Share]: {
		tab: ETopicsTab.Share;
	};
	[EScreenName.Job]: {
		tab: ETopicsTab.Job;
	};
	[EScreenName.Good]: {
		tab: ETopicsTab.Good;
	};

	[EScreenName.Me]: undefined;
	[EScreenName.Message]: undefined;
	[EScreenName.Posts]: undefined;
	[EScreenName.Reply]: undefined;
	[EScreenName.Collection]: undefined;
	[EScreenName.Scan]: undefined;
	[EScreenName.Detail]: {
		id: string;
	};
	[EScreenName.WebView]: {
		url: string;
		title: string;
	};
};
