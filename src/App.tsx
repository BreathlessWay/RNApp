import React from 'react';
import { Alert, Button } from 'react-native';

import { Provider } from 'mobx-react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '@pages/home';
import UserScreen from '@pages/user';

import store from '@stores/index';

import 'react-native-gesture-handler';

import { EScreenName, RootStackParamList } from '@/types/index.d';

// 关闭黄屏
console.disableYellowBox = true;

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

// 当使用导航时自带了SafeAreaView
const App = () => {
	return (
		<Provider {...store}>
			<NavigationContainer>
				<Navigator
					initialRouteName={EScreenName.Home}
					screenOptions={{
						headerStyle: {
							backgroundColor: '#f4511e',
						},
						headerTintColor: '#000',
						headerTitleStyle: {
							fontWeight: 'bold',
						},
					}}>
					<Screen
						name={EScreenName.Home}
						component={HomeScreen}
						options={{
							title: '首页',
							headerStyle: {
								backgroundColor: 'red',
							},
							headerTintColor: '#fff',
							headerTitleStyle: {
								fontWeight: 'bold',
								fontSize: 30,
							},
							headerRight: () => (
								<Button
									onPress={() => Alert.alert('This is a button!')}
									title="Info"
									color="#fff"
								/>
							),
						}}
					/>
					<Screen
						name={EScreenName.User}
						component={UserScreen}
						initialParams={{ title: '用户' }}
						options={({ route }) => ({ title: route.params.title })}
					/>
				</Navigator>
			</NavigationContainer>
		</Provider>
	);
};

export default App;
