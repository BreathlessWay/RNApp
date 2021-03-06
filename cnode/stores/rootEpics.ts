import { combineEpics } from 'redux-observable';

import {
	loginEpic,
	fetchUserEpic,
	messageCountEpic,
	makeCollectionEpic,
	makeOutCollectionEpic,
	getCollectionsEpic,
} from './user/epic';
import { getTopicsEpic } from './topics/epic';
import { getMessageEpic, markAllReadEpic, markReadEpic } from './message/epic';

const rootEpics = combineEpics(
	fetchUserEpic,
	loginEpic,
	messageCountEpic,
	makeCollectionEpic,
	makeOutCollectionEpic,
	getCollectionsEpic,
	getTopicsEpic,
	getMessageEpic,
	markReadEpic,
	markAllReadEpic,
);

export default rootEpics;
