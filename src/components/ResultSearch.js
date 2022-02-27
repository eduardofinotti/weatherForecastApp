import React from 'react'; 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ResultSearch(props) {

    async function saveItem(){
        var newCities
        const cities = await AsyncStorage.getItem('@cities')

        if(cities !== null) {
            if(cities.includes(props.city)){
                props.close('Alerta', 'Cidade já adicionada. Tente outra!')
                return
            }
            const json = JSON.parse(cities);
            newCities = [{name: props.city, favorite: false}, ...json]
        }else{
            newCities = [{name: props.city, favorite: false}]
        }

        const stringifiedTodos = JSON.stringify(newCities);
        AsyncStorage.setItem('@cities', stringifiedTodos)
        props.close('Sucesso', `Cidade ${props.city} adicionada com sucesso`)
    }

    return (
        <View style={styles.content}>
            <View style={styles.headerContent}>
                <View style={styles.localeContent}>
                    <Text style={styles.cityText}>{props.city}</Text>
                    <Text style={styles.countryText}>{props.state}</Text>
                </View>
            </View>
            
            <TouchableOpacity onPress={()=>{saveItem()}}>
                <Text style={styles.addText}>ADICIONAR</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    content:{
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
        color: '#f28200'
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
