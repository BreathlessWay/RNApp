import * as userActions from './user/action';
import * as topicsActions from './topics/action';
import * as appActions from './app/action';
import * as messageActions from './message/action';

const rootActions = {
	...appActions,
	...userActions,
	...topicsActions,
	...messageActions,
};

export default rootActions;
