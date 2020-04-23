import { AppAction$Type } from './app/type';

import { rootReducers } from './rootReducers';

export type AllAction$Type = AppAction$Type;

export type RootStateType = ReturnType<typeof rootReducers>;
