import { Alert } from 'react-native';

import { BASIC_URL, BASIC_API_KEY } from 'douban/config/constant';

export enum EMethod {
	'GET' = 'GET',
	'POST' = 'POST',
	'DELETE' = 'DELETE',
	'PUT' = 'PUT',
}

export const request = async ({
	url,
	method,
	body,
	customError = false,
}: {
	url: string;
	method?: EMethod;
	body?: Record<any, string>;
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
			},
			credentials: 'include',
		};
		if (body) {
			options.body = JSON.stringify({ ...body, apikey: BASIC_API_KEY });
		}

		if (_method === EMethod.GET) {
			if (_url.includes('?')) {
				_url = _url + `&apikey=` + BASIC_API_KEY;
			} else {
				_url = _url + `?apikey=` + BASIC_API_KEY;
			}
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
