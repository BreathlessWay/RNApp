import React, { Component } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { View, Text } from 'react-native';

import rootActions from 'cnode/stores/rootActions';

import { Dispatch } from '@reduxjs/toolkit';
import { RootStateType } from 'cnode/stores/rootType';

const mapStateToProps = (state: RootStateType) => {
	return {
		app: state.app,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		fetchUser: (username: string) =>
			dispatch(rootActions.fetchUser({ username })),
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type IndexReduxPropType = ConnectedProps<typeof connector>;

class Index extends Component<IndexReduxPropType> {
	componentDidMount(): void {
		this.props.fetchUser('BreathlessWay');
	}

	render(): React.ReactNode {
		const {
			app: { username },
		} = this.props;
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>{username}</Text>
			</View>
		);
	}
}

export default connector(Index);
