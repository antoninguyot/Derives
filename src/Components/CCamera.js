/* === Component permettant de filmer avec la caméra l'environnement === */

import React from 'react'
import {View} from 'react-native'
import {Camera} from "expo-camera";
import {styles} from "../../App.css";

const CCamera = () => {
  return (
    <View style={styles.mainContainer}>
      <Camera style={styles.preview}>
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
        </View>
      </Camera>
    </View>
  )
}


export default CCamera
