import React, { Component } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootStackParamList } from 'cnode/routes/type';

export type DrawerComponentPropType = {
	navigation: DrawerNavigationProp<RootStackParamList>;
};

export default class DrawerComponent extends Component<
	DrawerComponentPropType
> {
	render(): React.ReactNode {
		return (
			<TouchableOpacity onPress={this.props.navigation.toggleDrawer}>
				<View>
					<Text>1</Text>
				</View>
			</TouchableOpacity>
		);
	}
}
