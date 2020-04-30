import { ETopicsTag } from 'cnode/config/constant';

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
		tab: ETopicsTag;
	};
	[EScreenName.All]: {
		tab: ETopicsTag.All;
	};
	[EScreenName.Ask]: {
		tab: ETopicsTag.Ask;
	};
	[EScreenName.Share]: {
		tab: ETopicsTag.Share;
	};
	[EScreenName.Job]: {
		tab: ETopicsTag.Job;
	};
	[EScreenName.Good]: {
		tab: ETopicsTag.Good;
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
