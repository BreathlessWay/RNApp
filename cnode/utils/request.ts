import { of } from 'rxjs';
import { ajax, AjaxResponse, AjaxRequest } from 'rxjs/ajax';
import { catchError, filter, pluck } from 'rxjs/operators';

import { Alert } from 'react-native';

import * as Qs from 'qs';

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
	customError,
}: {
	url: string;
	method?: EMethod;
	body?: BodyInit_;
	headers?: Headers;
	customError?: boolean;
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
	return ajax(options).pipe(
		pluck<AjaxResponse, T>('response'),
		catchError((err: Error) => {
			if (customError) {
				throw err;
			} else {
				Alert.alert(err.name, err.message);
				return of((null as unknown) as T);
			}
		}),
		filter<T>((result) => Boolean(result)),
	);
};
