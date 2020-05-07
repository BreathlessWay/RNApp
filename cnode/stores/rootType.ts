import { rootReducers } from './rootReducers';

import { UserActionType } from './user/action';
import { TopicsActionType } from './topics/action';
import { AppActionType } from './app/action';
import { MessageActionType } from './message/action';

export type AllActionType =
	| AppActionType
	| UserActionType
	| TopicsActionType
	| MessageActionType;

export type RootStateType = ReturnType<typeof rootReducers>;
