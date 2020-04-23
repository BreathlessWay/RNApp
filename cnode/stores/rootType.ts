import { rootReducers } from './rootReducers';

import { AppAction$Type } from './app/action';

export type AllAction$Type = AppAction$Type;

export type RootStateType = ReturnType<typeof rootReducers>;
