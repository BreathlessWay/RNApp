import { rootReducers } from './rootReducers';

import { UserActionType } from './user/action';
import { TopicsActionType } from './topics/action';

export type AllActionType = UserActionType | TopicsActionType;

export type RootStateType = ReturnType<typeof rootReducers>;
