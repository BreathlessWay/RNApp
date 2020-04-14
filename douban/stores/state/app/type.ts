import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'douban/routes/type';

export type AppStateType = {
	stackNavigation: StackNavigationProp<RootStackParamList> | null;
};
