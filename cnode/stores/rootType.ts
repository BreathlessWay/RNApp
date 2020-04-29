import { rootReducers } from './rootReducers';

import { UserActionType } from './user/action';

export type AllActionType = UserActionType;

export type RootStateType = ReturnType<typeof rootReducers>;
