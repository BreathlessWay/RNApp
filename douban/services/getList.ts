import { useContext } from 'react';

import { DouBanContext } from 'douban/stores';

import { ActionType } from 'douban/stores/reducer/type';

import * as Qs from 'qs';
import { fetchData } from 'douban/utils/dataStore';

export type SetListType<U> = (
	payload: U & {
		params: Record<string, any>;
		loadMore?: boolean;
		refreshing?: boolean;
	},
) => void;

export function useGetList<T, U>({
	url,
	key,
}: {
	url: '/book/search' | '/movie/search' | '/music/search';
	key: 'book' | 'movie' | 'music';
}): [T, SetListType<U>] {
	const { state, dispatch } = useContext(DouBanContext);

	const { hasMore, loadMore, refreshing } = state[key];

	const setList: SetListType<U> = (payload) => {
		if (refreshing || loadMore || !hasMore) return;

		const startType = `LOADING_${key.toUpperCase()}_LIST_START` as ActionType,
			successType = `LOADING_${key.toUpperCase()}_LIST_SUCCESS` as ActionType,
			failType = `LOADING_${key.toUpperCase()}_LIST_FAIL` as ActionType;

		dispatch({ type: ActionType[startType], payload });

		const params = Qs.stringify({ ...state[key].params, ...payload.params });

		fetchData({ url: `${url}?${params}` })
			.then((res) => {
				dispatch({
					type: ActionType[successType],
					payload: {
						list: res.books ?? [],
						total: res.total ?? 0,
						refreshing: false,
						loadMore: false,
						error: false,
						errMsg: '',
					},
				});
			})
			.catch((err) => {
				dispatch({
					type: ActionType[failType],
					payload: {
						refreshing: false,
						loadMore: false,
						error: true,
						errMsg: err.message,
					},
				});
			});
	};

	return [(state[key] as unknown) as T, setList];
}