import { action, observable } from 'mobx';

export default class HotStore {
	@observable
	loading = false;

	@action.bound
	setLoading(loading: boolean) {
		this.loading = loading;
	}
}
