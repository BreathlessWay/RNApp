import { combineEpics } from 'redux-observable';

import { fetchUserEpic } from './app/epic';

import { AllAction$Type } from './type';

const rootEpic = combineEpics<AllAction$Type>(fetchUserEpic);

export default rootEpic;
