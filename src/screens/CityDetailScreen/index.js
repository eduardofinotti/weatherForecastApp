import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import CityForecast from '../../components/CityForecast';
import {getDayOfWeek, getMonthOfYear} from '../../utils/stringUtils'
import {getForecastCityByNameApi} from '../../services/weatherApi'

import styles from './style'

export default function CityDetailScreen({route, navigation}) {

  const {city} = route.params
  const [cityDetails, setCityDetails] = useState([])

  useEffect( ()=>{
      getCityInformation()
  }, [])

  async function getCityInformation() {

    var cityInfo = await getForecastCityByNameApi(city.name)

      var list = []
      var previousDate = null
      var currentDate = null

      cityInfo.list.forEach((element) => {
        var dateResponse = element.dt_txt
        dateResponse = dateResponse.split(' ')[0]
        currentDate = dateResponse
        
        var dateApi = new Date(dateResponse)
        const current = new Date()

        if(currentDate != previousDate && current < dateApi){
          list = [{
            name: element.name,
            date: element.dt_txt,
            date_text: `${new Date(dateResponse).getDate()} de ${getMonthOfYear(dateResponse)}`,
            day_week: getDayOfWeek(dateResponse),
            temp: element.main.temp,
            temp_min: element.main.temp_min, 
            temp_max: element.main.temp_max,
            description: element.weather[0].description},
            ...list]
        }

        previousDate = currentDate
      });
      
      list = list.reverse()
      setCityDetails(list)
  }

  return (
      <View style={styles.container}>

        <View style={styles.header}>
          <TouchableOpacity onPress={()=> {navigation.goBack()}}>
              <Icon name="md-chevron-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitleText}>{city.name}</Text>
        </View>

        <View style={styles.pageTitleContent}>
          <Text style={styles.pageTitleText}>Previsão para os próximos 5 dias</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          { cityDetails.map((item, i) => (
                <CityForecast city={item} key={i} index={i}/>
            ))
          }
        </ScrollView>

      </View>
    );
}