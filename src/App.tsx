import React, { useEffect, useRef } from 'react';

import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-easy-toast';

import RootRouteScreen from '@/routes';

import store from '@stores/index';

import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

configure({ enforceActions: 'observed' });
AsyncStorage.clear();
// 关闭黄屏
console.disableYellowBox = true;

// 当使用导航时自带了SafeAreaView
const App = () => {
	global.ref = useRef<Toast>();

	useEffect(() => {
		SplashScreen.hide();
	}, []);

	return (
		<Provider {...store}>
			<SafeAreaProvider>
				<RootRouteScreen />
				<Toast ref={global.ref as any} position="center" />
			</SafeAreaProvider>
		</Provider>
	);
};

export default App;
