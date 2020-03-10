import React, { useEffect } from 'react';

import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

import RootRouteScreen from '@/routes';

import store from '@stores/index';

import 'react-native-gesture-handler';

configure({ enforceActions: 'observed' });

// 关闭黄屏
console.disableYellowBox = true;
// 当使用导航时自带了SafeAreaView

const App = () => {
	useEffect(() => {
		SplashScreen.hide();
	}, []);

	return (
		<Provider {...store}>
			<SafeAreaProvider>
				<RootRouteScreen />
			</SafeAreaProvider>
		</Provider>
	);
};

export default App;
