import React, { useEffect } from 'react';

import { Provider } from 'mobx-react';
import SplashScreen from 'react-native-splash-screen';

import RootRouteScreen from '@/routes';

import store from '@stores/index';

import 'react-native-gesture-handler';

// 关闭黄屏
console.disableYellowBox = true;
// 当使用导航时自带了SafeAreaView

const App = () => {
	useEffect(() => {
		SplashScreen.hide();
	}, []);

	return (
		<Provider {...store}>
			<RootRouteScreen />
		</Provider>
	);
};

export default App;
