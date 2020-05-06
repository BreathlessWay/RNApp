import { catchError, takeUntil, filter, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Epic } from 'redux-observable';
import {
	TopicsActionType,
	getTopics,
	getTopicsSuccess,
	getTopicsFailed,
	getTopicsCanceled,
} from './action';
import { GetTopicsResponseType } from './type';
import { RootStateType } from 'cnode/stores/rootType';

import Qs from 'qs';
import { EMethod, request } from 'cnode/utils/request';

export const getTopicsEpic: Epic<
	TopicsActionType,
	TopicsActionType,
	RootStateType
> = (action$, state$) =>
	action$.pipe(
		filter(getTopics.match),
		map((action) => {
			const _refreshing = action.payload.refreshing,
				_topicItem = state$.value.topics[action.payload.tab],
				page = _refreshing ? 1 : _topicItem.page + 1,
				query = {
					page,
					limit: _topicItem.limit,
					tab: action.payload.tab,
				};
			return {
				...action,
				item: _topicItem,
				query,
			};
		}),
		switchMap((data) =>
			request<GetTopicsResponseType>({
				url: `/topics?${Qs.stringify(data.query)}`,
				method: EMethod.GET,
			}).pipe(
				map((result) => {
					const _refreshing = data.payload.refreshing,
						_topicItem = data.item,
						page = data.query.page,
						_resultList = result.data,
						list = _refreshing
							? _resultList
							: _topicItem.list.concat(_resultList),
						hasMore = _resultList.length === _topicItem.limit;
					return getTopicsSuccess({
						[data.payload.tab]: {
							..._topicItem,
							page,
							loading: false,
							refreshing: false,
							error: '',
							list,
							hasMore,
							empty: list.length === 0,
						},
					});
				}),
				catchError((error: Error) => {
					return of(
						getTopicsFailed({
							[data.payload.tab]: {
								...data.item,
								loading: false,
								refreshing: false,
								error: error.message,
							},
						}),
					);
				}),
				takeUntil(action$.pipe(filter(getTopicsCanceled.match))),
			),
		),
	);
