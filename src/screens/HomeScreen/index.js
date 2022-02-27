import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/Ionicons'

import CitySearchScreen from '../CitySearchScreen';
import CityWeather from '../../components/CityWeather';
import Geolocation from '@react-native-community/geolocation';

import Alert from '../../components/Alert'
import {getInfoCityByCoordsApi} from '../../services/weatherApi'
import {getDayOfWeek, getMonthOfYear} from '../../utils/stringUtils'

import styles from './style';

export default function HomeScreen(props) {

  const [cities, setCities] = useState([])
  const [locationWeather, setLocationWeather] = useState({})
  const [showSearchCityScreen, setShowSearchCityScreen] = useState(false);
  
  const [showAlert, setShowAlert] = useState(false)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  useEffect(()=>{
    getLocation()
    getMyCities()
  }, [])

  async function getInfoCityByCoords(coords) {

    var cityInfo = await getInfoCityByCoordsApi(coords)
    const myCities = await AsyncStorage.getItem('@cities')

    if(myCities == null || !myCities.includes(cityInfo.name)) {
        setLocationWeather(cityInfo)
        setTitle('Cidade localizada!')
        setMessage(`Você está em ${cityInfo.name}?`)
        setShowAlert(true)
    }
  }

  function getLocation(){
    Geolocation.getCurrentPosition(
      info => {
        if(info){
          getInfoCityByCoords(info.coords)
        }
      },
      error => {
        console.log("ERROR", error)
      }, {
        enableHighAccuracy: true,
        timeout: 99999,
        maximumAge: 3600000,
      },
    );
  }

  async function getMyCities(){
    setCities([])
    const myCities = await AsyncStorage.getItem('@cities')

    var listFavorites = []
    var listNotFavotires = []

    if(myCities) {
      const myCitiesJSON = JSON.parse(myCities);
      
      myCitiesJSON.forEach(element => {
        if(element.favorite == true){
          listFavorites = [element, ...listFavorites]
        } else {
          listNotFavotires = [element, ...listNotFavotires]
        }
      });

      const listCities = [...listFavorites, ...listNotFavotires]
      setCities(listCities)
    }
  }

  async function deleteCity(city) {
    const resultFiltered = cities.filter(item => item.name !== city)

    const resultFilteredToSave = JSON.stringify(resultFiltered);
    AsyncStorage.setItem('@cities', resultFilteredToSave)
    
    setCities(resultFiltered)
  }

  async function setAsFavorite(city, isFavorite) {
    var resultSorted = []

    cities.forEach(element => {
      if(element.name == city){
        resultSorted = [{name: element.name, favorite: !isFavorite}, ...resultSorted]
      } else {
        resultSorted = [element, ...resultSorted]
      }
    })

    const resultFilteredToSave = JSON.stringify(resultSorted);
    AsyncStorage.setItem('@cities', resultFilteredToSave)

    setCities(resultSorted)
    getMyCities()
  }
  
  function onCloseModal(){
    setShowSearchCityScreen(false)
    getMyCities()
  }

  async function saveItem(){
    var newCities
    const cities = await AsyncStorage.getItem('@cities')

    if(cities !== null) {
        const json = JSON.parse(cities);
        newCities = [{name: locationWeather.name, favorite: false}, ...json]
    }else{
        newCities = [{name: locationWeather.name, favorite: false}]
    }

    const stringifiedTodos = JSON.stringify(newCities);
    AsyncStorage.setItem('@cities', stringifiedTodos)

    setShowAlert(false)
    getMyCities()
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerTitleText}>Cidades</Text>
        <TouchableOpacity onPress={()=> {setShowSearchCityScreen(true)}}>
            <Icon name="search" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {cities.length <= 0 &&
        <View style={styles.dataContent}>
          <Text style={styles.emptyTitle}>Parece que você ainda não adicionou uma cidade</Text>
          <Text style={styles.emptySubtitle}>Tente adicionar uma cidade usando o botão de busca</Text>
        </View>
      }
      
      {cities.length > 0 &&
        <>
          <Text style={{padding: 20, fontSize: 16, color: '#000'}}>
            {getDayOfWeek(new Date())}, {new Date().getDate()} de {getMonthOfYear(new Date())}
          </Text>
        
          <ScrollView style={styles.resultContent} showsVerticalScrollIndicator={false}>
            {
              cities.map((item, i) => (
                <TouchableOpacity activeOpacity={0.9} key={i} onPress={()=>{
                    props.navigation.navigate('CityDetailScreen', {city: item})
                  }}>
                  <CityWeather 
                    city={item} 
                    onDelete={c => deleteCity(c)}
                    setAsFavorite={(city, isFavorite) => setAsFavorite(city, isFavorite)}
                  />
                </TouchableOpacity>
              ))
            }
          </ScrollView>
        </>
      }

      <Modal
        visible={showSearchCityScreen}
        transparent={false}
        animationType={'slide'}
        style={styles.modal}
        >
        <CitySearchScreen
          close={() => {
            onCloseModal()
          }}
        />
      </Modal>
      
      <Alert 
        isOpen={showAlert}
        message={message}
        title={title} 
        onCancel={()=> setShowAlert(false)}
        onConfirm={saveItem}/>

    </SafeAreaView>
  );
};
 