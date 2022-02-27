import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function CityForecast(props) {

    return (
        <View style={styles.content}>
            <View style={styles.headerContent}>
                <View style={styles.localeContent}>
                    <Text style={styles.cityText}>{props.index == 0 ? 'Hoje' : props.city.day_week}</Text>
                    <Text style={styles.countryText}>{props.city.date_text}</Text>
                </View>
                <Text style={styles.tempText}>{props.city.temp}°C</Text>
            </View>
    
            <View style={styles.footerContent}>
                <View>
                    <Text style={styles.conditionText}>{props.city.description}</Text>
                    <Text style={styles.maxMinText}>{props.city.temp_min}°C - {props.city.temp_max}°C</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        padding: 20,
        margin: 10,
        height: 150,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        marginVertical: 5
    },

    headerContent:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center'
    },

    localeContent:{
        justifyContent: 'center'
    },

    cityText: {
        fontSize: 24,
        color: '#000'
    },

    countryText: {
        fontSize: 14,
        color: '#000',
        marginTop: 5
    },

    tempText: {
        color: '#f28200',
        fontWeight: 'bold',
        fontSize: 34
    },  

    footerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingRight: 10
    },  

    conditionText: {
        fontSize: 14,
        color: '#f28200',
        fontWeight: 'bold'
    },  

    maxMinText: {
        fontSize: 14,
        color: '#000'
    },

    addText:{
        color: '#0078be',
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 1.25
    }

});
