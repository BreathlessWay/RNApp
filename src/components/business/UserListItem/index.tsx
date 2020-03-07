import React, { FC } from 'react';

import { View, Text, Image } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { TrendUserItemType } from '@stores/trend/trend';

import Style from './style';

export type UserListItemPropType = TrendUserItemType;

const UserListItem: FC<UserListItemPropType> = props => {
	return (
		<View style={Style.wrap}>
			<Image source={{ uri: props.avatar_url }} style={Style.img} />
			<View style={Style.content}>
				<View style={Style.top}>
					<View style={Style.name}>
						<Text style={Style.realName}>{props.name}</Text>
						<Text style={Style.loginName}>{props.login}</Text>
					</View>
					<View style={Style.follow}>
						<SimpleLineIcons name="user-following" size={12} color="#9E9E9E" />
						<Text style={Style.followCount}>{props.followers}</Text>
					</View>
				</View>
				<View style={Style.bottom}>
					{props.location && (
						<View style={Style.location}>
							<EvilIcons name="location" size={18} />
							<Text>{props.location}</Text>
						</View>
					)}
					<View style={Style.repos}>
						<MaterialCommunityIcons
							name="source-repository"
							size={16}
							color="#333"
						/>
						<Text>{props.public_repos}</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

export default UserListItem;
