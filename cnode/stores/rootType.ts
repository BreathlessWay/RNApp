import { rootReducers } from './rootReducers';

import { UserActionType } from './user/action';
import { TopicsActionType } from './topics/action';
import { AppActionType } from './app/action';

export type AllActionType = AppActionType | UserActionType | TopicsActionType;

export type RootStateType = ReturnType<typeof rootReducers>;
