import React, { useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'
import Input from '../../components/Input';
import ResultSearch from '../../components/ResultSearch';
import Alert from '../../components/Alert'

import {searchCity} from '../../services/googlePlacesApi'

import styles from './style'

export default function CitySearchScreen(props) {

  const [list, setList] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  async function getCity(city){
    var cities = await searchCity(city)
    setList(cities)
  }
 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={props.close}>
          <Icon name="close" size={22} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.inputContent}>
          {
            <Input
            placeholder="Pesquisar..."
            icon="magnify"
            onChange={(txt) => { getCity(txt) }}
            />
          }
        </View>
      </View>

      {list.length < 1 ?
        <View style={styles.emptyContainer}>
          <Image source={require('../../assets/images/search.png')} resizeMode={'contain'} style={{width: 400, height: 300}}/>
          <Text style={styles.emptyText}>Pesquise uma cidade para ser adicionada.</Text>
        </View>
      :
        <ScrollView style={styles.resultContent} showsVerticalScrollIndicator={false}>
          {
            list.map((item, i) => (
              <ResultSearch key={i} city={item.structured_formatting.main_text} state={item.structured_formatting.secondary_text} close={(title, message) => {
                setTitle(title)
                setMessage(message)
                setShowAlert(true)
              }}/>
            ))
          }
        </ScrollView>
      }

      <Alert 
        isOpen={showAlert}
        message={message}
        title={title} 
        onConfirm={()=> setShowAlert(false)}/>
      
    </SafeAreaView>
    
/*
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        query={{
          key: 'AIzaSyDWHj9rrTyZg4mPNvB4BM1EP5oAPh6324k',
          language: 'pt',
          types: '(cities)',
        }}
        onPress={(data, details = null) => console.log(data)}
        onFail={(error) => console.error(error)}
      />
    </View>
 */
    
  );
};