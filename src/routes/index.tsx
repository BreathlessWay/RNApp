import React, { FC } from 'react';
import { inject, observer } from 'mobx-react';

import WelcomeScreen from '@pages/welcome';
import DetailScreen from '@pages/detail';
import AboutScreen from '@pages/about';
import AuthorScreen from '@pages/author';
import WebViewScreen from '@pages/webview';
import CustomEditScreen from '@pages/edit';
import SortScreen from '@pages/sort';
import CustomThemeScreen from '@pages/theme';
import SearchScreen from '@pages/search';
import SwitchRoutePage from './switch';

import { Store } from '@/stores';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { EScreenName, RootStackParamList } from './route.d';

import '@config/hydrate';

// 当使用导航时自带了SafeAreaView
const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export type RootRoutePagePropType = Pick<Store, 'appStore'>;

const RootRoutePage: FC<RootRoutePagePropType> = props => {
	const {
		appStore: { theme },
	} = props;

	return (
		<NavigationContainer>
			<Navigator
				initialRouteName={EScreenName.Welcome}
				screenOptions={{
					headerStyle: {
						backgroundColor: theme,
					},
				}}>
				<Screen
					name={EScreenName.Welcome}
					component={WelcomeScreen}
					options={{
						headerShown: false,
					}}
				/>
				<Screen name={EScreenName.Switch} component={SwitchRoutePage} />
				<Screen name={EScreenName.Detail} component={DetailScreen} />
				<Screen
					name={EScreenName.About}
					component={AboutScreen}
					options={{
						headerShown: false,
					}}
				/>
				<Screen
					name={EScreenName.Author}
					component={AuthorScreen}
					options={{
						headerShown: false,
					}}
				/>
				<Screen name={EScreenName.WebView} component={WebViewScreen} />
				<Screen name={EScreenName.Edit} component={CustomEditScreen} />
				<Screen name={EScreenName.Sort} component={SortScreen} />
				<Screen name={EScreenName.Theme} component={CustomThemeScreen} />
				<Screen name={EScreenName.Search} component={SearchScreen} />
			</Navigator>
		</NavigationContainer>
	);
};

const RootRouteScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
}))(observer(RootRoutePage)) as unknown) as FC;

export default RootRouteScreen;
