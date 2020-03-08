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
	popularSwitchNavigation: BottomTabNavigationProp<
		RootStackParamList
	> | null = null;

	@observable
	trendSwitchNavigation: BottomTabNavigationProp<
		RootStackParamList
	> | null = null;

	@observable
	favoriteSwitchNavigation: BottomTabNavigationProp<
		RootStackParamList
	> | null = null;

	@action.bound
	setTheme(theme: string) {
		this.theme = theme;
	}

	@action.bound
	setStackNavigation(navigation: StackNavigationProp<RootStackParamList>) {
		this.stackNavigation = navigation;
	}

	@action.bound
	setPopularSwitchNavigation(
		navigation: BottomTabNavigationProp<RootStackParamList>,
	) {
		this.popularSwitchNavigation = navigation;
	}

	@action.bound
	setTrendSwitchNavigation(
		navigation: BottomTabNavigationProp<RootStackParamList>,
	) {
		this.trendSwitchNavigation = navigation;
	}

	@action.bound
	setFavoriteSwitchNavigation(
		navigation: BottomTabNavigationProp<RootStackParamList>,
	) {
		this.favoriteSwitchNavigation = navigation;
	}
}
