import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Modal from 'react-native-modalbox';

export default function Alert(props) {

    function onCancel(){
        props.onCancel()        
    }

    function onConfirm(){
        props.onConfirm()        
    }

    return (
        <Modal isOpen={props.isOpen} style={styles.modal} position="center" >
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.message}>{props.message}</Text>

            <View style={styles.buttonContainer}>
                {props.onCancel &&
                    <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
                        <Text style={styles.buttonTextCancel}>Cancelar</Text>
                    </TouchableOpacity>
                }

                <TouchableOpacity onPress={onConfirm} style={styles.okButton}>
                    <Text style={styles.buttonText}>Ok</Text>
                </TouchableOpacity>
            </View>
            
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        height: '30%',
        width: '80%',
        backgroundColor: '#fff',
    },

    title:{
        fontSize: 16,
        fontWeight: 'bold'
    },

    message:{
        textAlign: 'center',
        padding: 10,
        width: '90%'
    },

    buttonContainer: {
        flexDirection: 'row',
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    okButton:{
        width: '95%',
        justifyContent:'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 7,
        marginVertical: 10,
        backgroundColor: '#0078be',
        margin: 5
    },

    cancelButton:{
        width: '90%',
        justifyContent:'center',
        alignItems: 'center',
        padding: 7,
        borderRadius: 7,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#0078be',
        color: '#0078be',
        margin: 5
    },

    buttonText:{
        color: '#fff',
        fontWeight: 'bold'
    },

    
    buttonTextCancel:{
        color: '#0078be',
        fontWeight: 'bold'
    }

});
