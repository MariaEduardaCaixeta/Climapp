import { WeatherRow } from '@/components/WeatherRow';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import citiesData from '../data/cities.json';

const Cities = () => {
    const [description, setDescription] = useState('');

    return (
        <LinearGradient
            colors={['#00457D', '#05051F']}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite a cidade"
                        placeholderTextColor="#FFFFFF"
                        value={description}
                        onChangeText={setDescription}
                    />
                    <Ionicons name="search" size={16} color="white" />
                </View>

                <FlatList
                    data={citiesData}
                    keyExtractor={(city) => city.city}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
                    renderItem={({ item }) => (
                        <WeatherRow
                            cityName={item.city}
                            temperature={item.temp}
                        />
                    )}
                />
            </SafeAreaView>
        </LinearGradient>
    );
}

export default Cities;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        marginVertical: 20,
        gap: 40,
    },
    inputContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 24,
        backgroundColor: '#FFFFFF15',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    input: {
        color: '#FFFFFF',
        flex: 1,
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16,
    },
});