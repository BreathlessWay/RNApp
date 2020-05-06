import { combineEpics } from 'redux-observable';

import { loginEpic, fetchUserEpic, messageCountEpic } from './user/epic';
import { getTopicsEpic } from './topics/epic';

const rootEpics = combineEpics(
	fetchUserEpic,
	loginEpic,
	messageCountEpic,
	getTopicsEpic,
);

export default rootEpics;
