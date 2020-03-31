import { createContext, Dispatch } from 'react';

import { ActionType } from 'douban/stores/reducer/type';

import { StateType } from 'douban/stores/type';

export const initialState: StateType = {
	book: {},
	music: {},
	movie: {},
};

export const DouBanContext = createContext(
	{} as {
		state: StateType;
		dispatch: Dispatch<{ type: ActionType; payload?: Record<string, any> }>;
	},
);
