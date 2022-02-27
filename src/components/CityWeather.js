import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ActivityIndicator, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import {removeAccent} from '../utils/stringUtils'
import {getInfoCityByCityName} from '../services/weatherApi'

const tempConverter = require('temp_converter')

export default function CityWeather(props) {

    const [cityDetails, setCityDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isFavorite, setIsFavorite] = useState(false)
    const [isCelsius, setIsCelsius] = useState(true)
    const [temperatureC, setTemperatureC] = useState('')
    const [temperatureF, setTemperatureF] = useState('')

    useEffect( ()=>{
        getCityInformation()
    }, [])

    async function getCityInformation() {
        setIsLoading(true)
        
        var city = removeAccent(props.city.name)
        var cityInfo = await getInfoCityByCityName(city)

        setCityDetails(cityInfo)
        setTemperatureC(cityInfo.main.temp)
        setTemperatureF(tempConverter.CeltoFahr(cityInfo.main.temp).toString().substring(0,5))
        setIsFavorite(props.city.favorite)

        setIsLoading(false)
    }

    return (
        <View style={styles.content}>

            {isLoading  && !cityDetails ?
                <ActivityIndicator size="large" color={'#00aaf2'}/>
            :
                <>
                    <View style={styles.headerContent}>
                        <View style={styles.localeContent}>
                            <Text style={styles.cityText}>{cityDetails.name}</Text>
                            <Text style={styles.countryText}>Brasil</Text>
                        </View>
                        
                        <TouchableOpacity style={styles.labelChangeContent} onPress={()=>setIsCelsius(!isCelsius)}>
                            <Text style={styles.tempText}>{isCelsius ? temperatureC : temperatureF}°{isCelsius ? 'C': 'F'}</Text>
                            <Text style={styles.labelChangeText}>Toque para alterar medida</Text>
                        </TouchableOpacity>
                    </View>
            
                    <View style={styles.footerContent}>
                        <View>
                            <Text style={styles.conditionText}>{cityDetails.weather[0].description}</Text>
                            <Text style={styles.maxMinText}>{cityDetails.main.temp_min}° - {cityDetails.main.temp_max}°</Text>
                        </View>

                        <View style={styles.footerIcons}>
                            <TouchableOpacity onPress={()=>props.onDelete(props.city.name)}>
                                <Icon style={styles.icon} name={'trash'} size={25} color="#000" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>props.setAsFavorite(props.city.name, isFavorite)}>
                                <Icon style={styles.icon} name={isFavorite ? "heart-sharp" : 'heart-outline'} size={25} color="#ed0952" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        padding: 20,
        width: '100%',
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

    labelChangeContent:{
        alignItems: 'center'
    },

    labelChangeText: {
        marginTop: -5,
        fontSize: 12,
        opacity: 0.7
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

    footerIcons:{
        flexDirection: 'row',
        alignItems: 'center',
    },

    icon: {
        marginHorizontal: 5
    }
});
