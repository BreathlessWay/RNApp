import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BookPage from 'douban/pages/BookPage';

const { Screen, Navigator } = createBottomTabNavigator();

const TabRouter = () => {
	return (
		<Navigator>
			<Screen name="book" component={BookPage} />
			<Screen name="movie" component={BookPage} />
			<Screen name="music" component={BookPage} />
		</Navigator>
	);
};

export default TabRouter;
