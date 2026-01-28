import { Image, StyleSheet, Text, View } from 'react-native';

interface WeatherForecastProps {
    weekday: string;
    date: string;
    max: number;
    min: number;
}

export const WeatherForecast = ({ weekday, date, max, min }: WeatherForecastProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>{weekday}{'\n'}({date})</Text>
            <Image style={styles.image} source={require('../../assets/images/cloudy.png')} />
            <Text style={styles.tempText}>{max}/{min}º</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
        backgroundColor: '#FFFFFF15',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        width: 104
    },
    dateText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Montserrat_500Medium',
        textAlign: 'center',
    },
    image: {
        width: 24,
        height: 28
    },
    tempText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'Montserrat_600SemiBold',
    },
});