import { Alert, AsyncStorage } from 'react-native';

import * as Qs from 'qs';
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
	await AsyncStorage.setItem(url, Qs.stringify(wrapData(value)));
};

export const fetchLocalData = async (url: string): Promise<DataType | null> => {
	const data = await AsyncStorage.getItem(url);
	if (data) {
		return Qs.parse(data);
	} else {
		return null;
	}
};

export const fetchNetData = async (url: string) => {
	try {
		const data = await request({ url });
		await saveData(data);
		return data;
	} catch (e) {
		Alert.alert(e.message);
	}
};

export const fetchData = async (url: string) => {
	let data;
	try {
		data = await fetchLocalData(url);
		if (data && validData(data.timestamp)) {
		} else {
			data = await fetchNetData(url);
		}
	} catch (e) {
		console.error(e);
		data = await fetchNetData(url);
	}

	return data;
};
