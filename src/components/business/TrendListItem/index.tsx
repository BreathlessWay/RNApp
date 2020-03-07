import React, { FC } from 'react';

import { View, Text } from 'react-native';

import ReposListItem from '@components/business/ReposListItem';

import { ETrendTab } from '@config/constant';

export type TrendListItemPropType = {
	tab: ETrendTab;
	item: any;
};

const TrendListItem: FC<TrendListItemPropType> = props => {
	const { tab, item } = props;
	switch (tab) {
		case ETrendTab.allUser:
		case ETrendTab.chinaUser:
			return (
				<View>
					<Text>1</Text>
				</View>
			);
		case ETrendTab.repos:
			return <ReposListItem {...item} />;
		case ETrendTab.trendingDaily:
		case ETrendTab.trendingMonthly:
		case ETrendTab.trendingWeekly:
			return (
				<View>
					<Text>2</Text>
				</View>
			);
	}
};

export default TrendListItem;
