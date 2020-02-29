import React from 'react';

import { SafeAreaView } from 'react-native';

import HomePage from '@pages/home';

// 关闭黄屏
console.disableYellowBox = true;

const App = () => {
	return (
		<SafeAreaView>
			<HomePage />
		</SafeAreaView>
	);
};

export default App;
