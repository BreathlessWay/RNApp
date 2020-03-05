export enum EScreenName {
	Welcome = 'Welcome',

	Switch = 'Switch',
	Hot = 'Hot',
	Trend = 'Trend',
}

export type RootStackParamList = {
	[EScreenName.Welcome]: undefined;

	[EScreenName.Switch]: undefined;
	[EScreenName.Hot]: Record<any, string>;
	[EScreenName.Trend]: Record<any, any>;
};
