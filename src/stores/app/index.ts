import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';

export default class AppStore {
	@persist
	@observable
	theme = '#fff';

	@action.bound
	setTheme(theme: string) {
		this.theme = theme;
	}
}
