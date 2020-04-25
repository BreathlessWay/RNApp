const createActionThunk = (type: string, thunk?: Function) => {
	const actionCreator = () => thunk;

	actionCreator.toString = () => type;

	return actionCreator;
};

export default createActionThunk;
