import React, { FC } from 'react';
import { inject, observer } from 'mobx-react';

import { useNavigation } from '@react-navigation/native';

import { Linking } from 'react-native';
import OctIcons from 'react-native-vector-icons/Octicons';
import MenuListItem from 'trending/components/common/MenuListItem';
import CommonParallaxScrollView from 'trending/components/common/CommonParallaxScrollView';

import { Store } from 'trending/stores';

import { StackNavigationProp } from '@react-navigation/stack';
import { EScreenName, RootStackParamList } from 'trending/routes/route.d';

import Style from './style';

import aboutJson from 'trending/config/about.json';

import { MENU_LIST } from 'trending/config/menu';

export type AboutPagePropType = Pick<Store, 'appStore'>;

const AboutPage: FC<AboutPagePropType> = (props) => {
	const {
		appStore: { theme },
	} = props;

	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	const handleFeedback = async () => {
		try {
			const isSupport = await Linking.canOpenURL('mailto://731005087@qq.com');
			if (isSupport) {
				await Linking.openURL('mailto://731005087@qq.com');
			}
		} catch (e) {
			global.ref.current && global.ref.current.show(e.message);
		}
	};

	return (
		<CommonParallaxScrollView
			theme={theme}
			navigation={navigation}
			title={aboutJson.app.name}
			imageUrl={aboutJson.app.backgroundImg}
			name={aboutJson.app.name}
			avatarUrl={aboutJson.app.avatar}
			description={aboutJson.app.description}>
			<MenuListItem
				{...MENU_LIST.About_Author}
				themeColor={theme}
				onPress={() => navigation.navigate(EScreenName.Author)}
			/>
			<MenuListItem
				themeColor={theme}
				name="项目地址"
				Icons={OctIcons}
				icon="project"
				onPress={() =>
					navigation.navigate(EScreenName.WebView, {
						title: aboutJson.info.name,
						url: aboutJson.info.url,
					})
				}
			/>
			<MenuListItem
				themeColor={theme}
				{...MENU_LIST.Feedback}
				hasBorder={false}
				onPress={handleFeedback}
			/>
		</CommonParallaxScrollView>
	);
};

const AboutScreen = (inject((stores: Store) => ({
	appStore: stores.appStore,
}))(observer(AboutPage)) as unknown) as FC;

export default AboutScreen;
