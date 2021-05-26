import { Text, View } from 'react-native';
import React from 'react';
import styles from '../../App.css';

const Debug = ({
  season, moment, currentSpeed, latitude, longitude, localityDensity, localityType, weather, temperature, walking
}) => (
  <View style={styles.containerCaptorsTest}>
    <Text style={styles.textCaptorsTest}>Saison : {season}</Text>
    <Text style={styles.textCaptorsTest}>Moment : {moment}</Text>
    <Text style={styles.textCaptorsTest}>Vitesse : {currentSpeed}</Text>
    <Text style={styles.textCaptorsTest}>Lat / Lon : {latitude} / {longitude}</Text>
    <Text style={styles.textCaptorsTest}>Densité de pop : {localityDensity}</Text>
    <Text style={styles.textCaptorsTest}>Milieu : {localityType}</Text>
    <Text style={styles.textCaptorsTest}>Météo : {weather}</Text>
    <Text style={styles.textCaptorsTest}>Temperature : {temperature}</Text>
  </View>
);

export default Debug;
