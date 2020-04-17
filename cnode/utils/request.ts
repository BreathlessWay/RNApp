import { Alert } from 'react-native';

import * as Qs from 'qs';

import { BASIC_URL } from 'cnode/config/constant';

export enum EMethod {
	GET = 'GET',
	'POST' = 'POST',
	'DELETE' = 'DELETE',
	'PUT' = 'PUT',
}

export const request = async ({
	url,
	method,
	body,
	headers,
	customError = false,
}: {
	url: string;
	method?: EMethod;
	body?: BodyInit_;
	headers?: Headers;
	customError?: boolean;
}) => {
	try {
		let _url = url,
			_method = method || EMethod.GET;

		if (!url.startsWith('http')) {
			_url = BASIC_URL + url;
		}

		const options: any = {
			method: _method,
			headers: {
				'Content-Type': 'application/json',
				...headers,
			},
			credentials: 'include',
		};
		if (body) {
			options.body = Qs.stringify(body);
		}
		const response = await fetch(_url, options);
		if (response.ok) {
			return response.json();
		} else {
			throw new Error(JSON.stringify(response));
		}
	} catch (e) {
		if (!customError) {
			Alert.alert(e.message);
		}
		throw e;
	}
};
