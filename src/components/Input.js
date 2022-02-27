import React, { useState } from 'react';
import { StyleSheet, } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function Input(props) {

    const [value, setValue] = useState('')

    function onChangeValue(value) {
        setValue(value)
        props.onChange(value)
    }

    return (
        <TextInput style={styles.input}
            editable={props.editable}
            onFocus={() => { props.onFocus ? props.onFocus() : '' }}
            onBlur={() => { props.onFocus ? props.onBlur() : '' }}
            secureTextEntry={props.secureTextEntry}
            outlineColor="#fff"
            returnKeyType={"next"}
            keyboardType={props.keyboardType ? props.keyboardType : "default"}
            autoCapitalize={props.autoCapitalize ? props.autoCapitalize : "none"}
            underlineColor="#fff"
            placeholder={props.placeholder}
            placeholderTextColor={'#f5f5f5'}
            selectionColor={'#fff'}
            activeUnderlineColor={'#fff'}
            value={props.value ? props.value : value}
            onChangeText={text => {
                onChangeValue(text);
            }}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        flex: 1,
        backgroundColor: 'transparent',
        color: '#fff',
        fontSize: 16
    },
});
