import { combineEpics } from 'redux-observable';

import { fetchUserEpic } from './app/epic';

const rootEpics = combineEpics(fetchUserEpic);

// 全局错误收集
// const rootEpic = (
// 	action$: ActionsObservable<AppActionType>,
// 	state$: StateObservable<RootStateType>,
// 	de,
// ) =>
// 	combineEpics(fetchUserEpic)(action$, state$, de).pipe(
// 		catchError((error, source) => {
// 			console.error(error);
// 			return source;
// 		}),
// 	);

export default rootEpics;
