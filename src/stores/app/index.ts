import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';

import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '@routes/route.d';

export default class AppStore {
	@persist
	@observable
	theme = '#fff';

	@observable
	stackNavigation: StackNavigationProp<RootStackParamList> | null = null;

	@observable
	switchNavigation: BottomTabNavigationProp<RootStackParamList> | null = null;

	@action.bound
	setTheme(theme: string) {
		this.theme = theme;
	}

	@action.bound
	setStackNavigation(navigation: StackNavigationProp<RootStackParamList>) {
		this.stackNavigation = navigation;
	}

	@action.bound
	setSwitchNavigation(navigation: BottomTabNavigationProp<RootStackParamList>) {
		this.switchNavigation = navigation;
	}
}
