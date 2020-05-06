import { EMyTopicType, ETopicsTab } from 'cnode/config/constant';

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

	[EScreenName.Me]: {
		type: string;
	};
	[EScreenName.Message]: undefined;
	[EScreenName.Posts]: {
		type: EMyTopicType.Posts;
	};
	[EScreenName.Reply]: {
		type: EMyTopicType.Reply;
	};
	[EScreenName.Collection]: {
		type: EMyTopicType.Collection;
	};
	[EScreenName.Scan]: undefined;
	[EScreenName.Detail]: {
		id: string;
		tab?: ETopicsTab;
	};
};
