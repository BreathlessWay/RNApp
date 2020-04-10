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
	const { type, payload = {} } = action;
	switch (type) {
		case ActionType.LOADING_BOOK_LIST_START: {
			const { params, ...rest } = payload;
			const book = {
				...state.book,
				params: { ...state.book.params, ...params },
				...rest,
			};
			return { ...state, book };
		}
		case ActionType.LOADING_BOOK_LIST_SUCCESS: {
			const { list, total, ...rest } = payload,
				stateList = state.book.refreshing ? list : state.book.list.concat(list),
				hasMore = stateList.length < total,
				empty = total === 0;
			const book = {
				...state.book,
				...rest,
				hasMore,
				empty,
				list: stateList,
			};
			return { ...state, book };
		}
		case ActionType.LOADING_BOOK_LIST_FAIL: {
			const book = {
				...state.book,
				...payload,
			};
			return { ...state, book };
		}
		default:
			return state;
	}
};
