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
		url?: string;
	},
) => void;

export function useGetList<T, U>({
	url,
	key,
}: {
	url?:
		| '/book/search'
		| '/movie/search'
		| '/music/search'
		| '/movie/top250'
		| '/movie/in_theaters';
	key: 'book' | 'movie' | 'music';
}): [T, SetListType<U>] {
	const { state, dispatch } = useContext(DouBanContext);

	const { hasMore, loadMore, refreshing } = state[key];

	const setList: SetListType<U> = (payload) => {
		if (refreshing || loadMore || !hasMore) return;

		const startType = `LOADING_${key.toUpperCase()}_LIST_START` as ActionType,
			successType = `LOADING_${key.toUpperCase()}_LIST_SUCCESS` as ActionType,
			failType = `LOADING_${key.toUpperCase()}_LIST_FAIL` as ActionType;

		const { url: payloadUrl, ...rest } = payload;

		dispatch({ type: ActionType[startType], payload: rest });

		const params = Qs.stringify({ ...state[key].params, ...rest.params });

		let _url = url || payloadUrl;

		fetchData({ url: `${_url}?${params}` })
			.then((res) => {
				let list: Array<any> = [];
				switch (key) {
					case 'book': {
						list = res.books ?? [];
						break;
					}
					case 'movie': {
						list = res.subjects ?? [];
						break;
					}
					case 'music': {
						list = res.musics ?? [];
						break;
					}
				}
				dispatch({
					type: ActionType[successType],
					payload: {
						list,
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
