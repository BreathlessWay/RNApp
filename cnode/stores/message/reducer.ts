import { createReducer } from '@reduxjs/toolkit';

import { MessageStateType } from './type';

export const initialMessageState: MessageStateType = {};

export const messageReducer = createReducer<MessageStateType>(
	initialMessageState,
	{},
);
