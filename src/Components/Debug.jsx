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
    <Text style={styles.textCaptorsTest}>Position :&nbsp;
      {Number.isNaN(latitude) ? '...' : latitude.toPrecision(6)},&nbsp;
      {Number.isNaN(longitude) ? '...' : longitude.toPrecision(6)}
    </Text>
    <Text style={styles.textCaptorsTest}>Vitesse :&nbsp;
      {Number.isNaN(currentSpeed) ? '...' : currentSpeed.toPrecision(3)} m/s&nbsp;
      ({walking ? 'en mouvement' : 'à l\'arrêt'})
    </Text>
    <Text style={styles.textCaptorsTest}>Densité de pop : {localityDensity ?? '...'} habs/km&sup2; ({{
      city: 'ville',
      country: 'campagne',
      null: '...',
    }[localityType]})
    </Text>
    <Text style={styles.textCaptorsTest}>Saison : {season ?? '...'}</Text>
    <Text style={styles.textCaptorsTest}>Temperature : {temperature ?? '...'} °C ({{
      cold: 'froid',
      hot: 'chaud',
      sweet: 'doux',
      null: '...',
    }[weather]})
    </Text>
  </View>
);

Debug.propTypes = {
  season: PropTypes.string,
  moment: PropTypes.string,
  currentSpeed: PropTypes.number,
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  localityDensity: PropTypes.number,
  localityType: PropTypes.string,
  weather: PropTypes.string,
  temperature: PropTypes.number,
  walking: PropTypes.bool,
};

export default Debug;
