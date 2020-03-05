export enum EScreenName {
	Welcome = 'Welcome',

	Switch = 'Switch',
	Me = 'Me',
	Favorite = 'Favorite',
	Popular = 'Popular',
	Trend = 'Trend',
}

export type RootStackParamList = {
	[EScreenName.Welcome]: undefined;

	[EScreenName.Switch]: undefined;
	[EScreenName.Trend]: Record<any, any>;
	[EScreenName.Me]: undefined;
	[EScreenName.Favorite]: undefined;
	[EScreenName.Popular]: undefined;
};
