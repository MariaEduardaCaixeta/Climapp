import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface WeatherInfoRowProps {
    label: string;
    value: string;
    icon: React.ReactNode
}

export const WeatherInfoRow = ({ label, value, icon }: WeatherInfoRowProps) => {
    return (
        <View style={styles.todayCardDetails}>
            {icon}
            <Text style={[styles.todayCardText, { flex: 1 }]}>{label}:</Text>
            <Text style={styles.todayCardText}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    todayCardDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    todayCardText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Montserrat_500Medium',
    }
})