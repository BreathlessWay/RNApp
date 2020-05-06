import { createReducer } from '@reduxjs/toolkit';

import {
	getTopics,
	GetTopicsActionType,
	getTopicsCanceled,
	GetTopicsCanceledActionType,
	getTopicsFailed,
	GetTopicsFailedActionType,
	getTopicsSuccess,
	GetTopicsSuccessActionType,
} from './action';

import { TopicsStateType } from './type';

import { ETopicsTab, PAGE_SIZE } from 'cnode/config/constant';

export const initialTopicsState: TopicsStateType = {
	[ETopicsTab.All]: {
		loading: false,
		hasMore: true,
		refreshing: false,
		empty: true,
		page: 1,
		limit: PAGE_SIZE,
		error: '',
		list: [],
	},
	[ETopicsTab.Ask]: {
		loading: false,
		hasMore: true,
		refreshing: false,
		empty: true,
		page: 1,
		limit: PAGE_SIZE,
		error: '',
		list: [],
	},
	[ETopicsTab.Share]: {
		loading: false,
		hasMore: true,
		refreshing: false,
		empty: true,
		page: 1,
		limit: PAGE_SIZE,
		error: '',
		list: [],
	},
	[ETopicsTab.Job]: {
		loading: false,
		hasMore: true,
		refreshing: false,
		empty: true,
		page: 1,
		limit: PAGE_SIZE,
		error: '',
		list: [],
	},
	[ETopicsTab.Good]: {
		loading: false,
		hasMore: true,
		refreshing: false,
		empty: true,
		page: 1,
		limit: PAGE_SIZE,
		error: '',
		list: [],
	},
};

export const topicsReducer = createReducer<TopicsStateType>(
	initialTopicsState,
	{
		[getTopics.type]: (state, action: GetTopicsActionType) => {
			const item = state[action.payload.tab],
				_refreshing = Boolean(action.payload.refreshing);
			return {
				...state,
				[action.payload.tab]: {
					...item,
					refreshing: _refreshing,
					loading: !_refreshing,
				},
			};
		},
		[getTopicsSuccess.type]: (state, action: GetTopicsSuccessActionType) => {
			return {
				...state,
				...action.payload,
			};
		},
		[getTopicsFailed.type]: (state, action: GetTopicsFailedActionType) => {
			return {
				...state,
				...action.payload,
			};
		},
		[getTopicsCanceled.type]: (state, action: GetTopicsCanceledActionType) => {
			return {
				...state,
				...action.payload,
			};
		},
	},
);
