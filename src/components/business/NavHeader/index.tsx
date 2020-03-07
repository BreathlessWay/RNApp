import React from 'react';

import { CustomHeaderTitle } from '@components/common/NavBarComponent';
import { NavigationProp } from '@react-navigation/native';

const setHeader = (
	navigation: NavigationProp<Record<string, object | undefined>>,
) => {
	navigation.setOptions({
		headerTitle: () => <CustomHeaderTitle title="趋势" />,
		headerLeft: () => null,
		headerRight: () => null,
	});
};
