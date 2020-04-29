import { combineEpics } from 'redux-observable';

import { loginEpic, fetchUserEpic } from './user/epic';

const rootEpics = combineEpics(fetchUserEpic, loginEpic);

export default rootEpics;
