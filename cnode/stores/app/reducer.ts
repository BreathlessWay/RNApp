import { handleActions } from 'redux-actions';

import { AppActionType } from 'cnode/stores/app/type';

const reducer = handleActions(
	{
		[AppActionType.INCREMENT]: (state, action) => state,
	},
	{ counter: 0 },
);

export default reducer;
