import React, { useEffect, useReducer, useRef } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-easy-toast';

import { DouBanContext, initialState } from 'douban/stores';
import { reducer } from 'douban/stores/reducer';

import 'react-native-gesture-handler';

// 关闭黄屏
console.disableYellowBox = true;

// 当使用导航时自带了SafeAreaView
const App = () => {
	global.ref = useRef<Toast>();

	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		SplashScreen.hide();
	}, []);

	return (
		<DouBanContext.Provider value={{ state, dispatch }}>
			<SafeAreaProvider>
				<Toast ref={global.ref as any} position="center" />
			</SafeAreaProvider>
		</DouBanContext.Provider>
	);
};

export default App;
