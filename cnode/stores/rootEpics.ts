import { combineEpics } from 'redux-observable';

import { fetchUserEpic } from './app/epic';

const rootEpics = combineEpics(fetchUserEpic);

export default rootEpics;
