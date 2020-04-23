import React, { Component, createRef } from 'react';

import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-easy-toast';
import Index from 'cnode/pages';

import rootStore from 'cnode/stores/rootStore';

import 'react-native-gesture-handler';

// 关闭黄屏
console.disableYellowBox = true;

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
			<Provider store={rootStore}>
				<Index />
				<Toast ref={global.ref as any} position="center" />
			</Provider>
		);
	}
}
