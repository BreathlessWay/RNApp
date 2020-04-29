import React, { Component } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { View, Text, Image } from 'react-native';

import rootActions from 'cnode/stores/rootActions';

import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { RootStateType } from 'cnode/stores/rootType';

const mapStateToProps = (state: RootStateType) => {
	return {
		app: state.user,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) =>
	bindActionCreators(
		{
			fetchUser: (username: string) => rootActions.fetchUser({ username }),
		},
		dispatch,
	);

const connector = connect(mapStateToProps, mapDispatchToProps);

export type IndexReduxPropType = ConnectedProps<typeof connector>;

class Index extends Component<IndexReduxPropType> {
	componentDidMount(): void {
		this.props.fetchUser('BreathlessWay');
	}

	render(): React.ReactNode {
		const {
			app: { username, avatar_url },
		} = this.props;
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<View>
					<Text>{username}</Text>
					<Image
						source={{ uri: avatar_url }}
						style={{ width: 80, height: 80 }}
					/>
				</View>
			</View>
		);
	}
}

export default connector(Index);
