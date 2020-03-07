export enum EScreenName {
	Welcome = 'Welcome',

	Switch = 'Switch',
	Me = 'Me',
	Favorite = 'Favorite',

	Trend = 'Trend',

	Popular = 'Popular',

	Detail = 'Detail',
}

export type RootStackParamList = {
	[EScreenName.Welcome]: undefined;

	[EScreenName.Switch]: undefined;
	[EScreenName.Trend]: Record<any, any>;
	[EScreenName.Me]: undefined;
	[EScreenName.Favorite]: undefined;

	[EScreenName.Popular]: undefined;
	[EScreenName.PopularIndex]: undefined;
	[EScreenName.Detail]: {
		item: any;
	};
};
