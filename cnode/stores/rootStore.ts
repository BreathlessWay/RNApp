import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';

import { rootReducers, preloadedState } from './rootReducers';
import rootEpics from './rootEpics';

import { AllActionType, RootStateType } from './rootType';

const epicMiddleware = createEpicMiddleware<
	AllActionType,
	AllActionType,
	RootStateType
>();

const rootStore = configureStore({
	reducer: rootReducers,
	preloadedState,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: [...getDefaultMiddleware<RootStateType>(), epicMiddleware],
});
epicMiddleware.run(rootEpics);

export default rootStore;
