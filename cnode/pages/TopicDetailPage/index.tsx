import React, { Component } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HTMLView from 'react-native-htmlview';
import TopicTabItem from 'cnode/components/TopicTabItem';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { bindActionCreators, createSelector, Dispatch } from '@reduxjs/toolkit';
import { RootStateType } from 'cnode/stores/rootType';
import { EScreenName, RootStackParamList } from 'cnode/routes/type';
import { TopicDetailType } from 'cnode/stores/topics/type';

import rootActions from 'cnode/stores/rootActions';

import { request } from 'cnode/utils/request';
import { Subscription } from 'rxjs';
import dayjs from 'dayjs';

import Style from './style';

const getTopicDetail = createSelector(
	(state: RootStateType, props: TopicDetailPagePropType) => {
		const { tab, id } = props.route.params;
		if (tab === void 0) return null;
		const list = state.topics[tab].list;
		return list.find((item) => item.id === id);
	},
	(detail) => detail,
);

const mapStateToProps = (
	state: RootStateType,
	props: TopicDetailPagePropType,
) => {
	return {
		propDetail: getTopicDetail(state, props),
		accesstoken: state.user.accesstoken,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) =>
	bindActionCreators(
		{
			makeCollection: (item) => rootActions.makeCollection({ item }),
			makeOutCollection: (id) => rootActions.makeOutCollection({ id }),
		},
		dispatch,
	);

const connector = connect(mapStateToProps, mapDispatchToProps);

export type TopicDetailPageReduxPropType = ConnectedProps<typeof connector>;

export type TopicDetailPagePropType = {
	navigation: StackNavigationProp<RootStackParamList>;
	route: RouteProp<RootStackParamList, EScreenName.Detail>;
};

export type TopicDetailPageStateType = {
	stateDetail: TopicDetailType | null;
	is_collect: boolean;
};

class TopicDetailPage extends Component<
	TopicDetailPageReduxPropType & TopicDetailPagePropType,
	TopicDetailPageStateType
> {
	subscription: Subscription | null = null;

	readonly state = {
		stateDetail: null,
		is_collect: false,
	};

	get id() {
		return this.props.route.params.id;
	}

	get detail(): TopicDetailType {
		return this.state.stateDetail || (this.props.propDetail as TopicDetailType);
	}

	componentDidMount() {
		this.getDetail();
		this.props.navigation.setOptions({
			headerTitle: () => (
				<Text numberOfLines={1} style={Style.headerTitle}>
					{this.detail?.title ?? ''}
				</Text>
			),
		});
	}

	componentDidUpdate(
		prevProps: Readonly<TopicDetailPageReduxPropType & TopicDetailPagePropType>,
	) {
		if (prevProps.accesstoken !== this.props.accesstoken) {
			this.subscription?.unsubscribe();
			this.getDetail();
		}
	}

	getDetail = () => {
		const { accesstoken } = this.props,
			query = accesstoken && `?accesstoken=${accesstoken}`;

		this.subscription = request<{ success: boolean; data: TopicDetailType }>({
			url: `/topic/${this.id}${query}`,
		}).subscribe({
			next: (value) => {
				this.setState({
					stateDetail: value.data,
					is_collect: value.data.is_collect,
				});
				this.setCollection(value.data.is_collect);
			},
			error: (err) => {
				console.log(err);
			},
			complete: () => {
				console.log('complete');
			},
		});
	};

	handlePressFavorite = () => {
		const { accesstoken, navigation } = this.props;
		if (!accesstoken) {
			Alert.alert('尚未登录', '', [
				{
					text: '取消',
				},
				{
					text: '去登录',
					onPress: () => navigation.navigate(EScreenName.Scan),
				},
			]);
			return;
		}
		const { is_collect } = this.state;
		is_collect
			? this.props.makeOutCollection(this.detail.id)
			: this.props.makeCollection(this.detail);
		this.setState({
			is_collect: !is_collect,
		});
		this.setCollection(!is_collect);
	};

	setCollection = (is_collect: boolean) => {
		this.props.navigation.setOptions({
			headerRight: () => (
				<AntDesign
					name={is_collect ? 'star' : 'staro'}
					size={22}
					color={'#fff'}
					style={{ marginHorizontal: 5 }}
					onPress={this.handlePressFavorite}
				/>
			),
		});
	};

	componentWillUnmount() {
		this.subscription?.unsubscribe();
	}

	render() {
		const { detail } = this;
		return (
			detail && (
				<ScrollView>
					<View style={Style.header}>
						<Text style={Style.title}>{detail.title}</Text>
						<TopicTabItem
							top={detail.top}
							good={detail.good}
							tab={detail.tab}
							single={false}
						/>
						<View style={Style.info}>
							<Text style={Style.name}>{detail.author.loginname}</Text>
							<Text>|</Text>
							<Text style={Style.time}>
								{dayjs(detail.create_at).format('YYYY-MM-DD')}
							</Text>
						</View>
					</View>
					<View style={Style.content}>
						<HTMLView
							value={detail.content}
							renderNode={(node) => {
								if (node.name === 'img') {
									return (
										<Image
											source={{ uri: `https:${node.attribs.src}` }}
											style={Style.image}
										/>
									);
								}
							}}
						/>
					</View>
				</ScrollView>
			)
		);
	}
}

export default connector(TopicDetailPage);
