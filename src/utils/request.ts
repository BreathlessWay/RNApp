import * as Qs from 'qs';

export enum EMethod {
	GET = 'GET',
	'POST' = 'POST',
	'DELETE' = 'DELETE',
	'PUT' = 'PUT',
}

const baseUrl = '';

export const request = async ({
	url,
	method,
	body,
	headers,
}: {
	url: string;
	method: EMethod;
	body?: BodyInit_;
	headers?: Headers;
}) => {
	try {
		let _url = baseUrl + url;
		const options: any = {
			method,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
				...headers,
			},
		};
		if (body) {
			const _body = Qs.stringify(body);
			if (method === EMethod.GET) {
				_url = `${_url}?${_body}`;
			} else {
				options.body = _body;
			}
		}

		const response = await fetch(_url, options);
		return response.json();
	} catch (e) {
		throw e;
	}
};
