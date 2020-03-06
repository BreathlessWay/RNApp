import { Alert, AsyncStorage } from 'react-native';

import { request } from '@utils/request';

import { MAX_EXPIRE_CACHE } from '@config/constant';

export type DataType = {
	data: any;
	timestamp: number;
};

export const validData = (timestamp: number) => {
	const nowTime = new Date(),
		targetTime = new Date(timestamp);

	switch (true) {
		case nowTime.getMonth() !== targetTime.getMonth(): {
			return false;
		}
		case nowTime.getDate() !== targetTime.getDate(): {
			return false;
		}
		case nowTime.getHours() - targetTime.getHours() > MAX_EXPIRE_CACHE: {
			return false;
		}
		default: {
			return true;
		}
	}
};

export const wrapData = (data: any): DataType => {
	return { data, timestamp: Date.now() };
};

export const saveData = async ({ url, value }: { url: string; value: any }) => {
	await AsyncStorage.setItem(url, JSON.stringify(wrapData(value)));
};

export const fetchLocalData = async ({
	url,
}: {
	url: string;
}): Promise<DataType | null> => {
	const result = await AsyncStorage.getItem(url);
	if (result) {
		return JSON.parse(result);
	} else {
		return null;
	}
};

export const fetchNetData = async ({ url }: { url: string }) => {
	console.log('from net');
	try {
		const result = await request({ url });
		await saveData({ url, value: result });
		return result;
	} catch (e) {
		Alert.alert(e.message);
	}
};

export const fetchData = async ({ url }: { url: string }) => {
	let result;
	try {
		result = await fetchLocalData({ url });
		if (result && validData(result.timestamp)) {
			console.log('from cache');
			result = result.data;
		} else {
			result = await fetchNetData({ url });
		}
	} catch (e) {
		console.error(e);
		result = await fetchNetData({ url });
	}

	return result;
};
