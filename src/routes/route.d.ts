export enum EScreenName {
	Welcome = 'Welcome',

	Switch = 'Switch',
	Me = 'Me',
	Favorite = 'Favorite',
	Popular = 'Popular',
	Hot = 'Hot',
	Trend = 'Trend',
}

export type RootStackParamList = {
	[EScreenName.Welcome]: undefined;

	[EScreenName.Switch]: undefined;
	[EScreenName.Hot]: undefined;
	[EScreenName.Trend]: Record<any, any>;
	[EScreenName.Me]: undefined;
	[EScreenName.Favorite]: undefined;
	[EScreenName.Popular]: undefined;
};
