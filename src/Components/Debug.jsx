import { Text, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../App.css';

const Debug = ({
  season, moment, currentSpeed, latitude, longitude, localityDensity,
  localityType, weather, temperature, walking,
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
    <Text style={styles.textCaptorsTest}>Etat: {walking ? 'Marche' : 'Arrêt'}</Text>
  </View>
);

Debug.propTypes = {
  season: PropTypes.string.isRequired,
  moment: PropTypes.string.isRequired,
  currentSpeed: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  localityDensity: PropTypes.string.isRequired,
  localityType: PropTypes.string.isRequired,
  weather: PropTypes.string.isRequired,
  temperature: PropTypes.number.isRequired,
  walking: PropTypes.bool.isRequired,
};

export default Debug;
