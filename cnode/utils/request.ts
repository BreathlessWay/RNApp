import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

import * as Qs from 'qs';

import { AjaxRequest } from 'rxjs/internal/observable/dom/AjaxObservable';

import { BASIC_URL } from 'cnode/config/constant';

export enum EMethod {
	GET = 'GET',
	'POST' = 'POST',
	'DELETE' = 'DELETE',
	'PUT' = 'PUT',
}

export const request = <T>({
	url,
	method,
	body,
	headers,
}: {
	url: string;
	method?: EMethod;
	body?: BodyInit_;
	headers?: Headers;
}) => {
	let _url = url,
		_method = method || EMethod.GET;

	if (!url.startsWith('http')) {
		_url = BASIC_URL + url;
	}

	const options: AjaxRequest = {
		url: _url,
		method: _method,
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
	};
	if (body) {
		options.body = Qs.stringify(body);
	}
	return ajax(options).pipe(map<AjaxResponse, T>((result) => result.response));
};
