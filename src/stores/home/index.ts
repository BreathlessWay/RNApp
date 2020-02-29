import { action, observable } from 'mobx';

export default class HomeStore {
	@observable
	loading = false;

	@action.bound
	setLoading(loading: boolean) {
		this.loading = loading;
	}
}
