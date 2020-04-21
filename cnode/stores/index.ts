import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import reducers from './reducers';
import rootEpic from './epics';

const epicMiddleware = createEpicMiddleware();

const preloadedState = {
	app: { counter: 0 },
};

const enhancer = compose(applyMiddleware(epicMiddleware));

const configureStore = (initialState = preloadedState) => {
	const store = createStore(reducers, initialState, enhancer);
	epicMiddleware.run(rootEpic);
	return store;
};

export default configureStore;
