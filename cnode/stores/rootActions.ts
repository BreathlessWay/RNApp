import * as userActions from './user/action';
import * as topicsActions from './topics/action';

const rootActions = {
	...userActions,
	...topicsActions,
};

export default rootActions;
