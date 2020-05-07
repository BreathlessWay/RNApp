import { createReducer } from '@reduxjs/toolkit';

import { MessageStateType } from './type';
import {
	getMessage,
	getMessageFailed,
	GetMessageFailedActionType,
	getMessageSuccess,
	GetMessageSuccessActionType,
	markAllRead,
	markAllReadFailed,
	MarkAllReadFailedActionType,
	markAllReadSuccess,
	MarkAllReadSuccessActionType,
	markRead,
	MarkReadActionType,
	markReadFailed,
	MarkReadFailedActionType,
	markReadSuccess,
	MarkReadSuccessActionType,
} from './action';

export const initialMessageState: MessageStateType = {
	loading: false,
	error: '',
	has_read_messages: [],
	hasnot_read_messages: [],
};

export const messageReducer = createReducer<MessageStateType>(
	initialMessageState,
	{
		[getMessage.type]: (state, action) => {
			return {
				...state,
				error: '',
				loading: true,
			};
		},
		[getMessageSuccess.type]: (state, action: GetMessageSuccessActionType) => {
			return {
				...state,
				loading: false,
				...action.payload,
			};
		},
		[getMessageFailed.type]: (state, action: GetMessageFailedActionType) => {
			return {
				...state,
				error: action.payload.error,
				loading: false,
			};
		},
		[markRead.type]: (state, action: MarkReadActionType) => {
			return {
				...state,
				error: '',
				loading: true,
			};
		},
		[markReadSuccess.type]: (state, action: MarkReadSuccessActionType) => {
			let { hasnot_read_messages, has_read_messages } = state;
			const itemIndex = hasnot_read_messages.findIndex(
				(v) => v.id === action.payload.messageId,
			);
			if (itemIndex !== -1) {
				has_read_messages = has_read_messages.concat(
					hasnot_read_messages.splice(itemIndex, 1),
				);
			}
			return {
				...state,
				loading: false,
				hasnot_read_messages,
				has_read_messages,
			};
		},
		[markReadFailed.type]: (state, action: MarkReadFailedActionType) => {
			return {
				...state,
				error: action.payload.error,
				loading: false,
			};
		},
		[markAllRead.type]: (state, action) => {
			return {
				...state,
				error: '',
				loading: true,
			};
		},
		[markAllReadSuccess.type]: (
			state,
			action: MarkAllReadSuccessActionType,
		) => {
			let { hasnot_read_messages, has_read_messages } = state;
			let last_hasnot_read_messages: Array<any> = [];
			hasnot_read_messages.forEach((v) => {
				if (action.payload.messageIds.includes(v.id)) {
					has_read_messages.push(v);
				} else {
					last_hasnot_read_messages.push(v);
				}
			});

			return {
				...state,
				loading: false,
				hasnot_read_messages: last_hasnot_read_messages,
				has_read_messages,
			};
		},
		[markAllReadFailed.type]: (state, action: MarkAllReadFailedActionType) => {
			return {
				...state,
				error: action.payload.error,
				loading: false,
			};
		},
	},
);
