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
	const { type, payload } = action;
	switch (type) {
		case ActionType.LOADING_BOOK_LIST_START:
			const book = { ...state.book, ...payload };
			return { ...state, book };
		case ActionType.LOADING_BOOK_LIST_SUCCESS:
			return state;
		case ActionType.LOADING_BOOK_LIST_FAIL:
			return state;
		default:
			return state;
	}
};
