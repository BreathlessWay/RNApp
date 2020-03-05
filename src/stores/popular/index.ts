import { action, observable } from 'mobx';

export default class PopularStore {
	@observable
	loading = false;

	@action.bound
	setLoading(loading: boolean) {
		this.loading = loading;
	}
}
