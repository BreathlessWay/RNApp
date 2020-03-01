export enum EScreenName {
	Home = 'Home',
	User = 'User',
}

export type RootStackParamList = {
	[EScreenName.Home]: Record<any, string>;
	[EScreenName.User]: {
		_id: string;
		title: string;
	};
};
