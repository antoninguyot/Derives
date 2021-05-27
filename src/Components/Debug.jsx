import { Text, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../App.css';

const Debug = ({
  season, moment, currentSpeed, latitude, longitude, localityDensity,
  localityType, weather, temperature, walking,
}) => (
  <View style={styles.containerCaptorsTest}>
    <Text style={styles.textCaptorsTest}>Poème : {moment}</Text>
    <Text style={styles.textCaptorsTest}>Position : {latitude}, {longitude}</Text>
    <Text style={styles.textCaptorsTest}>Vitesse : {currentSpeed} m/s ({walking ? 'en mouvement' : 'à l\'arrêt'})</Text>
    <Text style={styles.textCaptorsTest}>Densité de pop : {localityDensity ?? 'Chargement...'} habs/pixel ({{
      city: 'ville',
      country: 'campagne',
      null: 'Chargement...',
    }[localityType]})
    </Text>
    <Text style={styles.textCaptorsTest}>Saison : {season ?? 'Chargement...'}</Text>
    <Text style={styles.textCaptorsTest}>Temperature : {temperature ?? 'Chargement...'} °C ({{
      cold: 'froid',
      hot: 'chaud',
      sweet: 'doux',
      null: 'Chargement...',
    }[weather]})
    </Text>
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
