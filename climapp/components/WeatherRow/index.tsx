import { Image, StyleSheet, Text, View } from "react-native";

export interface WeatherRowProps {
    cityName: string;
    temperature: number;
}

export const WeatherRow = ({ cityName, temperature }: WeatherRowProps) => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/cloudy.png')} />
            <Text style={styles.cityName}>{cityName}</Text>
            <Text style={styles.temperature}>{temperature}°C</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF15',
        borderRadius: 16,
        marginBottom: 12,
    },
    cityName: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Montserrat_500Medium',
    },
    temperature: {
        color: '#FFFFFF',
        fontSize: 25,
        fontFamily: 'Montserrat_700Bold',
    },
});