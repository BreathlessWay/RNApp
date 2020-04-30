import { combineEpics } from 'redux-observable';

import { loginEpic, fetchUserEpic, messageCountEpic } from './user/epic';

const rootEpics = combineEpics(fetchUserEpic, loginEpic, messageCountEpic);

export default rootEpics;
