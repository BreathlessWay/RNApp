import { createAction } from '@reduxjs/toolkit';

import {
	GetMessageFailedActionPayloadType,
	GetMessageSuccessActionPayloadType,
	MarkAllReadFailedActionPayloadType,
	MarkAllReadSuccessActionPayloadType,
	MarkReadActionPayloadType,
	MarkReadFailedActionPayloadType,
	MarkReadSuccessActionPayloadType,
} from './type';

export const getMessage = createAction('GET_MESSAGE');

export type GetMessageActionType = ReturnType<typeof getMessage>;

export const getMessageSuccess = createAction<
	GetMessageSuccessActionPayloadType
>('GET_MESSAGE_SUCCESS');

export type GetMessageSuccessActionType = ReturnType<typeof getMessageSuccess>;

export const getMessageFailed = createAction<GetMessageFailedActionPayloadType>(
	'GET_MESSAGE_FAILED',
);

export type GetMessageFailedActionType = ReturnType<typeof getMessageFailed>;

export const markRead = createAction<MarkReadActionPayloadType>('MARK_READ');

export type MarkReadActionType = ReturnType<typeof markRead>;

export const markReadSuccess = createAction<MarkReadSuccessActionPayloadType>(
	'MARK_READ_SUCCESS',
);

export type MarkReadSuccessActionType = ReturnType<typeof markReadSuccess>;

export const markReadFailed = createAction<MarkReadFailedActionPayloadType>(
	'MARK_READ_FAILED',
);

export type MarkReadFailedActionType = ReturnType<typeof markReadFailed>;

export const markAllRead = createAction('MARK_ALL_READ');

export type MarkAllReadActionType = ReturnType<typeof markAllRead>;

export const markAllReadSuccess = createAction<
	MarkAllReadSuccessActionPayloadType
>('MARK_ALL_READ_SUCCESS');

export type MarkAllReadSuccessActionType = ReturnType<
	typeof markAllReadSuccess
>;

export const markAllReadFailed = createAction<
	MarkAllReadFailedActionPayloadType
>('MARK_ALL_READ_FAILED');

export type MarkAllReadFailedActionType = ReturnType<typeof markAllReadFailed>;

export type MessageActionType =
	| GetMessageActionType
	| GetMessageSuccessActionType
	| GetMessageFailedActionType
	| MarkReadActionType
	| MarkReadSuccessActionType
	| MarkReadFailedActionType
	| MarkAllReadActionType
	| MarkAllReadSuccessActionType
	| MarkAllReadFailedActionType;
