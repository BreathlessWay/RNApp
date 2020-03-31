import { Reducer } from 'react';

import { StateType } from 'douban/stores/type';

import { ActionType } from './type';

export const reducer: Reducer<
	StateType,
	{
		type: ActionType;
		payload?: Record<string, any>;
	}
> = (state, action) => {
	switch (action.type) {
		case ActionType.increment:
			return state;
		case ActionType.decrement:
			return state;
		default:
			return state;
	}
};
