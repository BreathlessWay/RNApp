import { AppAction$Type } from './app/type';
import { rootReducers } from 'cnode/stores/rootReducers';

export type AllAction$Type = AppAction$Type;

export type RootStateType = ReturnType<typeof rootReducers>;
