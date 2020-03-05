import { action, observable } from 'mobx';
import { persist } from 'mobx-persist';

export default class PopularStore {
	@persist
	@observable
	loading = false;

	@action.bound
	setLoading(loading: boolean) {
		this.loading = loading;
	}
}
