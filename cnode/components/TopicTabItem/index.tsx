import React, { Component } from 'react';

import { Text, View } from 'react-native';

import { ETopicsTab } from 'cnode/config/constant';

import Style from './style';

export type TopicItemPropType = {
	good: boolean;
	top: boolean;
	tab: ETopicsTab;
	single?: boolean;
};

export default class TopicTabItem extends Component<TopicItemPropType> {
	get tabs() {
		const tabs = [];
		const { good, top, tab } = this.props;
		if (top) {
			tabs.push('置顶');
		}
		if (good) {
			tabs.push('精华');
		}
		switch (tab) {
			case ETopicsTab.Ask:
				tabs.push('问答');
				break;
			case ETopicsTab.Job:
				tabs.push('工作');
				break;
			case ETopicsTab.Share:
				tabs.push('分享');
				break;
		}
		return tabs;
	}

	get isGoodOrTop() {
		const { good, top } = this.props;
		return good || top;
	}

	render() {
		const {
			tabs,
			isGoodOrTop,
			props: { single = true },
		} = this;

		const tabGoodStyle = isGoodOrTop ? Style.good : {};

		return tabs.length && single ? (
			<Text style={{ ...Style.tab, ...tabGoodStyle }}>{tabs[0]}</Text>
		) : (
			<View style={Style.tabs}>
				{tabs.map((tab) => (
					<Text style={{ ...Style.tab, ...tabGoodStyle }}>{tab}</Text>
				))}
			</View>
		);
	}
}
