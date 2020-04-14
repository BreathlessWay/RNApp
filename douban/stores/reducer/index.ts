import { Reducer } from 'react';

import { StateType } from 'douban/stores/type';

import { ActionType } from './type';
import { CurrentMovieListType } from 'douban/stores/state/movie/type';

export const reducer: Reducer<
	StateType,
	{
		type: ActionType;
		payload?: Record<string, any>;
	}
> = (state, action) => {
	const { type, payload = {} } = action;

	switch (type) {
		case ActionType.SET_STACK_NAVIGATION: {
			return { ...state, app: { stackNavigation: payload.stackNavigation } };
		}

		// 书籍
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
		// 电影
		case ActionType.LOADING_MOVIE_LIST_START: {
			const { params, ...rest } = payload;
			const movie = {
				...state.movie,
				params,
				...rest,
			};
			return { ...state, movie };
		}
		case ActionType.LOADING_MOVIE_LIST_SUCCESS: {
			const {
				type,
				params: { city },
			} = state.movie;

			if (type === CurrentMovieListType.Top) {
				const { list, total, ...rest } = payload,
					stateList = state.movie.refreshing
						? list
						: state.movie.list[CurrentMovieListType.Top].list.concat(list),
					hasMore = stateList.length < total,
					empty = total === 0;
				const _list = {
					...state.movie.list,
					[CurrentMovieListType.Top]: {
						hasMore,
						empty,
						total,
						list: stateList,
					},
				};
				const movie = {
					...state.movie,
					...rest,
					list: _list,
				};
				return { ...state, movie };
			}
			if (type === CurrentMovieListType.Hot) {
				const { list, total, ...rest } = payload,
					stateList = state.movie.refreshing
						? list
						: state.movie.list[CurrentMovieListType.Hot][city].list.concat(
								list,
						  ),
					hasMore = stateList.length < total,
					empty = total === 0;
				const _list = {
					[CurrentMovieListType.Top]:
						state.movie.list[CurrentMovieListType.Top],
					[CurrentMovieListType.Hot]: {
						...state.movie.list[CurrentMovieListType.Hot],
						[city]: {
							hasMore,
							empty,
							total,
							list: stateList,
						},
					},
				};
				const movie = {
					...state.movie,
					...rest,
					list: _list,
				};
				return { ...state, movie };
			}
		}
		case ActionType.LOADING_MOVIE_LIST_FAIL: {
			const movie = {
				...state.movie,
				...payload,
			};
			return { ...state, movie };
		}
		// 音乐
		case ActionType.LOADING_MUSIC_LIST_START: {
			const { params, ...rest } = payload;
			const music = {
				...state.music,
				params: { ...state.music.params, ...params },
				...rest,
			};
			return { ...state, music };
		}
		case ActionType.LOADING_MUSIC_LIST_SUCCESS: {
			const { list, total, ...rest } = payload,
				stateList = state.music.refreshing
					? list
					: state.music.list.concat(list),
				hasMore = stateList.length < total,
				empty = total === 0;
			const music = {
				...state.music,
				...rest,
				hasMore,
				empty,
				list: stateList,
			};
			return { ...state, music };
		}
		case ActionType.LOADING_MUSIC_LIST_FAIL: {
			const music = {
				...state.music,
				...payload,
			};
			return { ...state, music };
		}
		default:
			return state;
	}
};
