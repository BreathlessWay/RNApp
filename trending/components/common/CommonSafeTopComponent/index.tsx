import React, { FC } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

const CommonSafeTopComponent: FC = (props) => {
	return (
		<SafeAreaView style={{ paddingBottom: 0 }}>{props.children}</SafeAreaView>
	);
};

export default CommonSafeTopComponent;
