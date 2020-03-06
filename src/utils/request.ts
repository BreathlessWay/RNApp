import * as Qs from 'qs';

export enum EMethod {
	GET = 'GET',
	'POST' = 'POST',
	'DELETE' = 'DELETE',
	'PUT' = 'PUT',
}

const baseUrl = 'https://raw.githubusercontent.com';

export const request = async ({
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
	try {
		let _url = baseUrl + url,
			_method = method || EMethod.GET;
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
		console.log(e);
		throw e;
	}
};
