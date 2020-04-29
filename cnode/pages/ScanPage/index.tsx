import React, { Component, createRef } from 'react';

import { connect, ConnectedProps } from 'react-redux';
import { Animated, Easing, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStateType } from 'cnode/stores/rootType';
import { RootStackParamList } from 'cnode/routes/type';

import Style from './style';
import rootActions from 'cnode/stores/rootActions';

const mapStateToProps = (state: RootStateType) => {
	return {
		user: state.user,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) =>
	bindActionCreators(
		{
			login: (accesstoken) => rootActions.login({ accesstoken }),
		},
		dispatch,
	);

const connector = connect(mapStateToProps, mapDispatchToProps);

export type ScanPagePropType = {
	navigation: StackNavigationProp<RootStackParamList>;
} & ConnectedProps<typeof connector>;

export type ScanPageStateType = {
	moveAnim: Animated.Value;
	hasScan: boolean;
};

class ScanPage extends Component<ScanPagePropType, ScanPageStateType> {
	readonly camera = createRef<RNCamera>();

	readonly state: ScanPageStateType = {
		moveAnim: new Animated.Value(0),
		hasScan: false,
	};

	componentDidMount() {
		const { user, navigation } = this.props;
		if (user.isLogin) {
			navigation.goBack();
			return;
		}
		this.startAnimation();
		// mock for 模拟器
		// this.props.login('86e9accb-82f4-42bf-81a2-0210bc07338d');
		// this.props.navigation.goBack();
	}

	startAnimation = () => {
		this.state.moveAnim.setValue(0);
		Animated.timing(this.state.moveAnim, {
			toValue: -200,
			duration: 5000,
			easing: Easing.linear,
		}).start(() => this.startAnimation());
	};

	//  识别二维码
	onBarCodeRead = ({ data }: { data: string }) => {
		if (data && !this.state.hasScan) {
			global.ref.current.show('扫描成功');
			this.setState({
				hasScan: true,
			});
			this.props.login(data);
			this.props.navigation.goBack();
		}
	};

	render() {
		return (
			<View style={Style.container}>
				<RNCamera
					ref={this.camera}
					style={Style.preview}
					type={RNCamera.Constants.Type.back}
					flashMode={RNCamera.Constants.FlashMode.on}
					onBarCodeRead={this.onBarCodeRead}>
					<View style={Style.rectangleContainer}>
						<View style={Style.rectangle} />
						<Animated.View
							style={[
								Style.border,
								{ transform: [{ translateY: this.state.moveAnim }] },
							]}
						/>
						<Text style={Style.rectangleText}>
							将二维码/条码放入框内，即可自动扫描
						</Text>
					</View>
				</RNCamera>
			</View>
		);
	}
}

export default connector(ScanPage);
