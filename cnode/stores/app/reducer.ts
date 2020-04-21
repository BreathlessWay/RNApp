import { Action, handleActions } from 'redux-actions';

import { AppActionType } from 'cnode/stores/app/type';

const reducer = handleActions(
	{
		[AppActionType.FETCH_USER]: (state, action) => {
			return {
				...state,
				a: 1,
			};
		},
		[AppActionType.FETCH_USER_FULFILLED]: (
			state,
			action: Action<{ data: any }>,
		) => {
			return {
				...state,
				a: 2,
			};
		},
	},
	{} as any,
);

export default reducer;
