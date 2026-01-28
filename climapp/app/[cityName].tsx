import { WeatherForecast } from "@/components/WeatherForecast";
import { WeatherInfoRow } from "@/components/WeatherInfoRow";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Forecast {
    date: string;
    weekday: string;
    max: number;
    min: number;
}

interface CityDetailsParams {
    city: string;
    date: string;
    description: string;
    temp: number;
    minTemp: number;
    maxTemp: number;
    humidity: number;
    windSpeed: number;
    forecast: Forecast[];
}

const CityDetails = () => {
    const searchParams = useLocalSearchParams();
    const [cityData, setCityData] = useState<CityDetailsParams | undefined>(undefined);
    const [todayForecast, setTodayForecast] = useState<Forecast | undefined>(undefined);

    const handleData = async () => {
        try {
            const response = await fetch(`https://climapp-api.vercel.app/api`);
            const responseJSON = await response.json();

            const city = responseJSON.find((cityData: CityDetailsParams) => cityData.city.toLowerCase() === String(searchParams.cityName).toLowerCase());
            if (city) {
                const cityDateShort = city.date.substring(0, 5); // Pega "26/01" de "26/01/2025"
                const today = city.forecast.find((forecast: Forecast) => forecast.date === cityDateShort);
                setTodayForecast(today);
                setCityData(city);
            }
        } catch (error) {
            console.error("Error fetching city data:", error);
        }
    }

    useEffect(() => {
        handleData();
    }, []);

    if (!cityData) {
        return (
            <LinearGradient
                colors={['#00457D', '#05051F']}
                style={{ flex: 1 }}
            />
        )
    }

    return (
        <LinearGradient
            colors={['#00457D', '#05051F']}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()} style={styles.chevron}>
                        {({ pressed }) => (
                            <Ionicons name="chevron-back" size={24} color="white" style={{ opacity: pressed ? 0.5 : 1 }} />
                        )}
                    </Pressable>
                    <Text style={styles.headerText}>{cityData?.city.replace(", ", " - ")}</Text>
                </View>
                <View style={styles.todayCard}>
                    <Text style={styles.todayCardText}>Hoje {todayForecast?.date}</Text>
                    <View style={styles.middleContent}>
                        <Image style={styles.todayCardImage} source={require('../assets/images/cloudy.png')} />
                        <Text style={styles.todayCardTemp}>{cityData?.temp}ºC</Text>
                        <Text style={styles.todayCardDescription}>{cityData?.description}</Text>
                    </View>
                    <View style={{ width: '100%', gap: 8 }}>
                        <WeatherInfoRow
                            label="Umidade"
                            value={`${cityData?.humidity}%`}
                            icon={<Ionicons name="water" size={24} color="#0E87E4" style={styles.icon} />}
                        />
                        <WeatherInfoRow
                            label="Min/Max"
                            value={`${todayForecast?.min}ºC / ${todayForecast?.max}ºC`}
                            icon={<Ionicons name="thermometer-outline" size={24} color="#E4750E" style={styles.icon} />}
                        />
                    </View>
                </View>

                <View>
                    <FlatList
                        data={cityData?.forecast.slice(1)} // Pula o primeiro item (hoje)
                        keyExtractor={(item) => item.date}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
                        renderItem={({ item }) => (
                            <WeatherForecast
                                weekday={item.weekday}
                                date={item.date}
                                max={item.max}
                                min={item.min}
                            />
                        )}>
                    </FlatList>
                </View>
            </SafeAreaView>

        </LinearGradient>
    );
};

export default CityDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
        paddingTop: 20,
        gap: 40,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    chevron: {
        position: 'absolute',
        left: 0
    },
    headerText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'Montserrat_600SemiBold',
    },
    todayCard: {
        backgroundColor: '#4463D5',
        borderRadius: 24,
        padding: 16,
        alignItems: 'center',
        gap: 24,
    },
    todayCardText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Montserrat_600SemiBold',
    },
    middleContent: {
        alignItems: 'center',
        gap: 0,
    },
    todayCardImage: {
        width: 72,
        height: 64
    },
    icon: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 4,
    },
    todayCardTemp: {
        color: '#FFFFFF',
        fontSize: 43,
        fontFamily: 'Montserrat_700Bold',
    },
    todayCardDescription: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'Montserrat_400Regular',
    },
});