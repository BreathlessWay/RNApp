import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { rootReducers, preloadedState } from './rootReducers';
import rootEpics from './rootEpics';

import { AllAction$Type } from './rootType';

const epicMiddleware = createEpicMiddleware<AllAction$Type>();

const enhancer = compose(applyMiddleware(epicMiddleware));

const configureStore = (initialState = preloadedState) => {
	const store = createStore(rootReducers, initialState, enhancer);
	epicMiddleware.run(rootEpics as any);
	return store;
};

export default configureStore;
