import React, { useEffect, useRef } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-easy-toast';

import 'react-native-gesture-handler';

// 关闭黄屏
console.disableYellowBox = true;

// 当使用导航时自带了SafeAreaView
const App = () => {
	global.ref = useRef<Toast>();

	useEffect(() => {
		SplashScreen.hide();
	}, []);

	return (
		<SafeAreaProvider>
			<Toast ref={global.ref as any} position="center" />
		</SafeAreaProvider>
	);
};

export default App;
