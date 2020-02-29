import React from 'react';

import { SafeAreaView } from 'react-native';
import { Provider } from 'mobx-react';

import HomePage from '@pages/home';

import store from '@stores/index';

// 关闭黄屏
console.disableYellowBox = true;

const App = () => {
	return (
		<SafeAreaView>
			<Provider {...store}>
				<HomePage />
			</Provider>
		</SafeAreaView>
	);
};

export default App;
