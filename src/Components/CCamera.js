/* === Component permettant de filmer avec la caméra l'environnement === */

import React, { useEffect } from 'react'
import {StyleSheet, View} from 'react-native'
import {Camera} from "expo-camera";
import {groupStyleSheet} from "../../Appcss";

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

  const styles = groupStyleSheet.styleCCamera

export default CCamera
