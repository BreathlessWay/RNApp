import { rootReducers } from './rootReducers';

import { AppActionType } from './app/action';

export type AllActionType = AppActionType;

export type RootStateType = ReturnType<typeof rootReducers>;
