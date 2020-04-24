import { createEpicMiddleware } from 'redux-observable';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { rootReducers, preloadedState } from './rootReducers';
import rootEpics from './rootEpics';

import { RootStateType } from './rootType';

const epicMiddleware = createEpicMiddleware();

const rootStore = configureStore({
	reducer: rootReducers,
	preloadedState,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: [...getDefaultMiddleware<RootStateType>(), epicMiddleware],
});
epicMiddleware.run(rootEpics as any);

export type RootDispatch = typeof rootStore.dispatch;

export default rootStore;
