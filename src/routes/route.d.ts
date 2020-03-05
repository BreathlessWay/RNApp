export enum EScreenName {
	Welcome = 'Welcome',

	Switch = 'Switch',
	Me = 'Me',
	Favorite = 'Favorite',
	Trend = 'Trend',

	Popular = 'Popular',
	PopularIndex = 'PopularIndex',
	PopularDetail = 'PopularDetail',
}

export type RootStackParamList = {
	[EScreenName.Welcome]: undefined;

	[EScreenName.Switch]: {
		theme?: string;
	};
	[EScreenName.Trend]: Record<any, any>;
	[EScreenName.Me]: undefined;
	[EScreenName.Favorite]: undefined;

	[EScreenName.Popular]: undefined;
	[EScreenName.PopularIndex]: undefined;
	[EScreenName.PopularDetail]: undefined;
};
