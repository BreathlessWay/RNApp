import * as Qs from 'qs';
import { Alert } from 'react-native';

export enum EMethod {
	GET = 'GET',
	'POST' = 'POST',
	'DELETE' = 'DELETE',
	'PUT' = 'PUT',
}

const baseUrl = 'https://api.github.com/search/repositories';

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
			_url = baseUrl + url;
		}

		const options: any = {
			method: _method,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
				...headers,
			},
			credentials: 'include',
		};
		if (body) {
			const _body = Qs.stringify(body);
			if (_method === EMethod.GET) {
				_url = `${_url}?${_body}`;
			} else {
				options.body = _body;
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
