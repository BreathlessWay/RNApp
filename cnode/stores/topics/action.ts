import { createAction } from '@reduxjs/toolkit';

import {
	GetTopicsActionPayloadType,
	GetTopicsCanceledActionPayloadType,
	GetTopicsFailedActionPayloadType,
	GetTopicsSuccessActionPayloadType,
} from './type';

export const getTopics = createAction<GetTopicsActionPayloadType>('GET_TOPICS');

export type GetTopicsActionType = ReturnType<typeof getTopics>;

export const getTopicsSuccess = createAction<GetTopicsSuccessActionPayloadType>(
	'GET_TOPICS_SUCCESS',
);

export type GetTopicsSuccessActionType = ReturnType<typeof getTopicsSuccess>;

export const getTopicsFailed = createAction<GetTopicsFailedActionPayloadType>(
	'GET_TOPICS_FAILED',
);

export type GetTopicsFailedActionType = ReturnType<typeof getTopicsFailed>;

export const getTopicsCanceled = createAction<
	GetTopicsCanceledActionPayloadType
>('GET_TOPICS_CANCELED');

export type GetTopicsCanceledActionType = ReturnType<typeof getTopicsCanceled>;

export type TopicsActionType =
	| GetTopicsActionType
	| GetTopicsSuccessActionType
	| GetTopicsFailedActionType
	| GetTopicsCanceledActionType;
