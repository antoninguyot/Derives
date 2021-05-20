import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import styles from "../../App.css";
import {Ionicons} from "@expo/vector-icons";

/**
 * Component which return the button
 * @param   navigation
 * @param   destination
 * @param   icon
 * @param   text
 * @param   param
 */
const Button = (props) => {
    return(
        <TouchableOpacity
            style={[styles.buttonStyle, {backgroundColor: 'black', borderWidth: 1, borderColor: 'white'}]}
            onPress={() => {
                props.navigation.replace(props.destination, props.param);
            }}>
            {props.icon &&
            <Ionicons name={props.icon} size={48} color="white" style={{textAlign: 'center'}}/>}
            <Text style={[styles.textTitleW, {textAlign: 'center'}]}>
                {props.text}
            </Text>
        </TouchableOpacity>
    );
}

export default Button;
