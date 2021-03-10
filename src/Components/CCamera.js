/* === Component permettant de filmer avec la caméra l'environnement === */

import React, { useEffect } from 'react'
import {StyleSheet, View} from 'react-native'
import {Camera} from "expo-camera";

const CCamera = () => {

    useEffect(() => {
        Camera.requestPermissionsAsync();
    })

    return (
      <View style={styles.mainContainer}>
        <Camera style={styles.preview}>
          <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          </View>
        </Camera>
      </View>
    )
}

  const styles = StyleSheet.create({
      mainContainer: {
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'black',
      },
      preview: {
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
      },
  });

export default CCamera
