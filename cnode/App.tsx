import React, { Component, createRef } from 'react';

import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-easy-toast';

import configureStore from 'cnode/stores';

import 'react-native-gesture-handler';

// 关闭黄屏
console.disableYellowBox = true;

const store = configureStore();

export default class App extends Component {
	constructor(props: any) {
		super(props);
		global.ref = createRef<Toast>();
	}
	componentDidMount(): void {
		SplashScreen.hide();
	}

	render() {
		return (
			<Provider store={store}>
				<Toast ref={global.ref as any} position="center" />
			</Provider>
		);
	}
}
