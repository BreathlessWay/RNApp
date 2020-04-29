import { ajax, AjaxResponse, AjaxRequest } from 'rxjs/ajax';
import { catchError, map, pluck } from 'rxjs/operators';

import { Alert } from 'react-native';

import * as Qs from 'qs';

import { BASIC_URL } from 'cnode/config/constant';

export enum EMethod {
	GET = 'GET',
	'POST' = 'POST',
	'DELETE' = 'DELETE',
	'PUT' = 'PUT',
}

export const request = <T extends { success: boolean; error_msg?: string }>({
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
		map((result) => {
			if (result.success) {
				return result;
			} else {
				throw new Error(result.error_msg);
			}
		}),
		catchError((err: Error) => {
			if (!customError) {
				Alert.alert(err.name, err.message);
			}
			throw err;
		}),
	);
};
