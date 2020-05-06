import { combineEpics } from 'redux-observable';

import {
	loginEpic,
	fetchUserEpic,
	messageCountEpic,
	makeCollectionEpic,
	makeOutCollectionEpic,
} from './user/epic';
import { getTopicsEpic } from './topics/epic';

const rootEpics = combineEpics(
	fetchUserEpic,
	loginEpic,
	messageCountEpic,
	makeCollectionEpic,
	makeOutCollectionEpic,
	getTopicsEpic,
);

export default rootEpics;
