import * as userActions from './user/action';
import * as topicsActions from './topics/action';
import * as appActions from './app/action';

const rootActions = {
	...appActions,
	...userActions,
	...topicsActions,
};

export default rootActions;
