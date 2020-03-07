import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';

import { NavigationProp, NavigationState } from '@react-navigation/native';

export default class AppStore {
	@persist
	@observable
	theme = '#fff';

	@observable
	stackNavigation: NavigationProp<
		Record<string, object | undefined>,
		string,
		NavigationState,
		{},
		{}
	> | null = null;

	@observable
	switchNavigation: NavigationProp<
		Record<string, object | undefined>,
		string,
		NavigationState,
		{},
		{}
	> | null = null;

	@action.bound
	setTheme(theme: string) {
		this.theme = theme;
	}

	@action.bound
	setStackNavigation(
		navigation: NavigationProp<
			Record<string, object | undefined>,
			string,
			NavigationState,
			{},
			{}
		>,
	) {
		this.stackNavigation = navigation;
	}

	@action.bound
	setSwitchNavigation(
		navigation: NavigationProp<
			Record<string, object | undefined>,
			string,
			NavigationState,
			{},
			{}
		>,
	) {
		this.switchNavigation = navigation;
	}
}
