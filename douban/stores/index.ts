import { createContext, Dispatch } from 'react';

import { bookState } from 'douban/stores/state/book/state';
import { musicState } from 'douban/stores/state/music/state';
import { movieState } from 'douban/stores/state/movie/state';

import { ActionType } from 'douban/stores/reducer/type';
import { StateType } from 'douban/stores/type';

export const initialState: StateType = {
	book: bookState,
	music: musicState,
	movie: movieState,
};

export const DouBanContext = createContext(
	{} as {
		state: StateType;
		dispatch: Dispatch<{ type: ActionType; payload?: Record<string, any> }>;
	},
);
