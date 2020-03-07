import React, { FC, useState } from 'react';

import { Text, Modal, View, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Style from './style';

export type PopupComponentPropType = {
	list: Array<{
		name: string;
		key: string;
		active: boolean;
	}>;
	onClose?: () => void;
	onSelect: (key: string) => void;
};

const PopupComponent: FC<PopupComponentPropType> = props => {
	const [visible, setVisible] = useState(false);

	const { onClose, onSelect, list } = props;

	const activeItem = list.find(item => item.active);

	const handlePress = () => {
		setVisible(false);
		onClose && onClose();
	};

	const handlePressText = () => {
		setVisible(true);
	};

	const handleSelect = (key: string) => {
		onSelect(key);
		setVisible(false);
	};

	return (
		<View>
			<TouchableOpacity onPress={handlePressText} activeOpacity={1}>
				<View style={Style.label}>
					<Text style={Style.show}>{activeItem?.name ?? ''}</Text>
					<MaterialIcons name="arrow-drop-down" size={24} color="#333" />
				</View>
			</TouchableOpacity>
			<Modal transparent={true} visible={visible} onRequestClose={onClose}>
				<TouchableOpacity
					onPress={handlePress}
					style={Style.btn}
					activeOpacity={1}>
					<View style={Style.content}>
						<MaterialIcons
							name="arrow-drop-up"
							size={36}
							color="#fff"
							style={Style.icon}
						/>
						<View style={Style.list}>
							{list.map(item => (
								<TouchableOpacity
									key={item.key}
									onPress={() => handleSelect(item.key)}>
									<Text style={Style.item}>{item.name}</Text>
								</TouchableOpacity>
							))}
						</View>
					</View>
				</TouchableOpacity>
			</Modal>
		</View>
	);
};

export default PopupComponent;
