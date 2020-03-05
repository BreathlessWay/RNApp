import React, { FC } from 'react';

import { View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

const CommonSafeTopComponent: FC = props => {
	const insets = useSafeArea();

	return (
		<View
			style={{
				paddingTop: insets.top,
			}}>
			{props.children}
		</View>
	);
};

export default CommonSafeTopComponent;
