import React, { useState } from 'react';
import {
	SafeAreaView,
	View,
	Text,
	StatusBar,
	TextInput,
	NativeSyntheticEvent,
	TextInputSubmitEditingEventData,
	Button,
	Alert,
	TouchableHighlight,
	FlatList,
	SectionList,
} from 'react-native';

const App = () => {
	const [value, setValue] = useState('');

	const handleChange = (text: string) => {
		setValue(text);
	};

	const handleSubmit = (
		e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
	) => {
		console.log(e);
	};

	const handlePressButton = () => {
		Alert.alert('dian');
	};

	return (
		<>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView>
				<View>
					<TextInput
						value={value}
						placeholder="Type here to translate!"
						onChangeText={handleChange}
						onSubmitEditing={handleSubmit}
					/>
					<Text>{value}</Text>
					<Button onPress={handlePressButton} title="Press Me" />
					<TouchableHighlight onPress={handlePressButton}>
						<Text>TouchableHighlight</Text>
					</TouchableHighlight>
					<FlatList
						data={[
							{ key: 'Devin' },
							{ key: 'Dan' },
							{ key: 'Dominic' },
							{ key: 'Jackson' },
							{ key: 'James' },
							{ key: 'Joel' },
							{ key: 'John' },
							{ key: 'Jillian' },
							{ key: 'Jimmy' },
							{ key: 'Julie' },
						]}
						renderItem={({ item }) => <Text>{item.key}</Text>}
					/>
					<SectionList
						sections={[
							{ title: 'D', data: ['Devin', 'Dan', 'Dominic'] },
							{
								title: 'J',
								data: [
									'Jackson',
									'James',
									'Jillian',
									'Jimmy',
									'Joel',
									'John',
									'Julie',
								],
							},
						]}
						renderItem={({ item }) => <Text>{item}</Text>}
						renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
						keyExtractor={(item, index) => String(index)}
					/>
				</View>
			</SafeAreaView>
		</>
	);
};

export default App;
