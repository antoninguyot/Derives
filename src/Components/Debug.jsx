import { Text, View } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import i18n from 'i18n-js';
import styles from '../../App.css';

const Debug = ({
  season, moment, currentSpeed, latitude, longitude, localityDensity,
  localityType, weather, temperature, walking,
}) => (
  <View style={styles.containerCaptorsTest}>
    <Text style={styles.textCaptorsTest}>{i18n.t('debug.moment')} : {moment}</Text>
    <Text style={styles.textCaptorsTest}>{i18n.t('debug.position')} :&nbsp;
      {Number.isNaN(latitude) ? '...' : latitude.toPrecision(6)},&nbsp;
      {Number.isNaN(longitude) ? '...' : longitude.toPrecision(6)}
    </Text>
    <Text style={styles.textCaptorsTest}>{i18n.t('debug.speed')} :&nbsp;
      {Number.isNaN(currentSpeed) ? '...' : currentSpeed.toPrecision(3)} m/s&nbsp;
      ({walking ? 'en mouvement' : 'à l\'arrêt'})
    </Text>
    <Text style={styles.textCaptorsTest}>{i18n.t('debug.density')} : {localityDensity ?? '...'} habs/km&sup2; ({{
      city: i18n.t('localities.city'),
      country: i18n.t('localities.country'),
      null: '...',
    }[localityType]})
    </Text>
    <Text style={styles.textCaptorsTest}>{i18n.t('debug.season')} : {season ?? '...'}</Text>
    <Text style={styles.textCaptorsTest}>{i18n.t('debug.temperature')} : {temperature ?? '...'} °C ({{
      cold: i18n.t('weather.cold'),
      hot: i18n.t('weather.hot'),
      sweet: i18n.t('weather.sweet'),
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
