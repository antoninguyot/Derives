import React from 'react';
import { View } from 'react-native';
import { Camera } from 'expo-camera';
import styles from '../../App.css';

const CCamera = () => (
  <View style={styles.containerCamera}>
    <Camera style={styles.containerPreviewCamera}>
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }} />
    </Camera>
  </View>
);

export default CCamera;
