import React, { Component } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { View, Text, Image } from 'react-native';

import rootActions from 'cnode/stores/rootActions';

import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { RootStateType } from 'cnode/stores/rootType';

const mapStateToProps = (state: RootStateType) => {
	return {
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) =>
	bindActionCreators({}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

export type IndexReduxPropType = ConnectedProps<typeof connector>;

class Index extends Component<IndexReduxPropType> {
	componentDidMount(): void {
		// this.props.fetchUser('BreathlessWay');
	}

	render(): React.ReactNode {
		const {
			user: { userInfo },
		} = this.props;
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<View>
					<Text>{userInfo?.loginname}</Text>
					<Image
						source={{ uri: userInfo?.avatar_url }}
						style={{ width: 80, height: 80 }}
					/>
				</View>
			</View>
		);
	}
}

export default connector(Index);
