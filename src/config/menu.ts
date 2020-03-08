import OctIcons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export const MENU_LIST = {
	Custom_Language: {
		name: '自定义语言',
		Icons: IonIcons,
		icon: 'md-checkbox-outline',
	},
	Sort_Language: {
		name: '语言排序',
		Icons: MaterialCommunityIcons,
		icon: 'sort',
	},
	Custom_Theme: {
		name: '自定义主题',
		Icons: MaterialCommunityIcons,
		icon: 'palette-outline',
	},
	Custom_Key: {
		name: '自定义标签',
		Icons: IonIcons,
		icon: 'md-checkbox-outline',
	},
	Sort_Key: {
		name: '标签排序',
		Icons: MaterialCommunityIcons,
		icon: 'sort',
	},
	Remove_Key: {
		name: '移除标签',
		Icons: OctIcons,
		icon: 'diff-removed',
	},
	About_Author: {
		name: '关于作者',
		Icons: SimpleLineIcons,
		icon: 'user',
	},
	About: {
		name: '关于',
		Icons: IonIcons,
		icon: 'logo-github',
	},
	Tutorial: {
		name: '教程',
		Icons: OctIcons,
		icon: 'bookmark',
	},
	Feedback: {
		name: '反馈',
		Icons: SimpleLineIcons,
		icon: 'feed',
	},
	Share: {
		name: '分享',
		Icons: IonIcons,
		icon: 'md-share',
	},
};
