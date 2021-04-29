import React from 'react';
import {styles} from "../../App.css";
import {Image, Text, View} from "react-native";

export const Person = (props) => {

  return (
    <View style={{flexDirection: 'row', paddingVertical: 10}}>
      <Image style={{width: 125, height: 125, borderRadius: 75, resizeMode: 'contain'}} source={props.image}/>
      <View style={{paddingHorizontal: 15, flexDirection: 'column', justifyContent: 'space-around'}}>
        <Text style={[styles.textTitleW, {fontSize: 24, textAlign: 'left'}]}>{props.name}</Text>
        <Text style={styles.textLittleW}>{props.description}</Text>
      </View>
    </View>
  )
}
