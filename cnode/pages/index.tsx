import React, { ComponentClass, Component } from 'react';

import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import { fetchUser } from 'cnode/stores/app/action';

import { StateType } from 'cnode/stores/type';
import { Dispatch } from 'redux';

const mapStateToProps = (state: StateType) => {
	return {
		app: state.app,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		fetchUser: (username: string) => dispatch(fetchUser({ username })),
	};
};

export type ReduxType = ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>;

@connect(mapStateToProps, mapDispatchToProps)
class Index extends Component<ReduxType> {
	componentDidMount(): void {
		this.props.fetchUser('BreathlessWay');
	}

	render(): React.ReactNode {
		console.log(this.props.app.a);
		return (
			<View>
				<Text>1</Text>
			</View>
		);
	}
}

export default (Index as unknown) as ComponentClass;
