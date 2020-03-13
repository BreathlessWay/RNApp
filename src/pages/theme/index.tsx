import React, { FC } from 'react';
import { inject, observer } from 'mobx-react';

import { useNavigation } from '@react-navigation/native';

import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { setHeader } from '@components/business/NavHeader';

import { Store } from '@/stores';

import { THEME_COLOR } from '@config/constant';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@routes/route.d';

import Style from './style';

export type CustomThemePagePropType = Pick<Store, 'appStore'>;

const CustomThemePage: FC<CustomThemePagePropType> = props => {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	const {
		appStore: { theme, setTheme },
	} = props;

	const handleBack = () => {
		navigation.goBack();
	};

	const handlePress = (color: string) => {
		if (color !== theme) {
			setTheme(color);
		}
	};

	setHeader({
		navigation,
		title: '自定义主题',
		left: <IonIcons name={'ios-arrow-back'} size={20} color="#fff" />,
		onPressLeft: handleBack,
	});

	return (
		<ScrollView style={Style.wrap}>
			{THEME_COLOR.map(color => (
				<TouchableOpacity onPress={() => handlePress(color)} key={color}>
					<View style={{ ...Style.item, backgroundColor: color }}>
						<Text style={Style.name}>{color}</Text>
						<AntDesign
							name={theme === color ? 'checkcircle' : 'checkcircleo'}
							size={20}
							style={Style.icon}
							color={'#fff'}
						/>
					</View>
				</TouchableOpacity>
			))}
		</ScrollView>
	);
};

const CustomThemeScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
}))(observer(CustomThemePage)) as unknown) as FC;

export default CustomThemeScreen;
