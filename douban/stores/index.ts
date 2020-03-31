import { createContext } from 'react';

const Context = createContext({
	bookStore: null,
	musicStore: null,
	movieStore: null,
});

export default Context;
