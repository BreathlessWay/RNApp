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

import { ETopicsTag, PAGE_SIZE } from 'cnode/config/constant';

export const initialTopicsState: TopicsStateType = {
	[ETopicsTag.All]: {
		loading: false,
		hasMore: true,
		refreshing: false,
		page: 1,
		limit: PAGE_SIZE,
		error: '',
		list: [],
	},
	[ETopicsTag.Ask]: {
		loading: false,
		hasMore: true,
		refreshing: false,
		page: 1,
		limit: PAGE_SIZE,
		error: '',
		list: [],
	},
	[ETopicsTag.Share]: {
		loading: false,
		hasMore: true,
		refreshing: false,
		page: 1,
		limit: PAGE_SIZE,
		error: '',
		list: [],
	},
	[ETopicsTag.Job]: {
		loading: false,
		hasMore: true,
		refreshing: false,
		page: 1,
		limit: PAGE_SIZE,
		error: '',
		list: [],
	},
	[ETopicsTag.Good]: {
		loading: false,
		hasMore: true,
		refreshing: false,
		page: 1,
		limit: PAGE_SIZE,
		error: '',
		list: [],
	},
};

export const topicsReducer = createReducer<any>(initialTopicsState, {
	[getTopics.type]: (state, action: GetTopicsActionType) => {
		return {
			...state,
			loading: true,
		};
	},
	[getTopicsSuccess.type]: (state, action: GetTopicsSuccessActionType) => {
		return {
			...state,
			loading: true,
		};
	},
	[getTopicsFailed.type]: (state, action: GetTopicsFailedActionType) => {
		return {
			...state,
			loading: true,
		};
	},
	[getTopicsCanceled.type]: (state, action: GetTopicsCanceledActionType) => {
		return {
			...state,
			loading: true,
		};
	},
});
