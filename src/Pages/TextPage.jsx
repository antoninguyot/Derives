import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Animated, Text, TouchableOpacity, View,
} from 'react-native';
import useInterval from '@use-it/interval';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import CCamera from '../Components/CCamera';
import styles from '../../App.css';
import { sedacDataset, sedacLocationRequest } from '../Helpers/location';
import { calculateMoment, calculateSeason } from '../Helpers/time';
import weatherRequest from '../Helpers/weather';
import { combine, getTextArray } from '../Helpers/text';
import { fadeTo } from '../Helpers/anim';
import {
  getAcceleration, getAmbiance, getMusic, getOneOff, play,
} from '../Helpers/sound';

const TextPage = ({ navigation }) => {
  // Page states
  const [isMounted, setIsMounted] = useState(true);
  const [debug, setDebug] = useState(false);

  // Localisation states
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [localityDensity, setLocalityDensity] = useState();
  const [localityType, setLocalityType] = useState(navigation.getParam('localityType'));
  const [season] = useState(calculateSeason());
  const [moment] = useState(navigation.getParam('moment', calculateMoment()));
  const [temperature, setTemperature] = useState(-100);
  const [weather, setWeather] = useState(navigation.getParam('weather'));

  // Music states
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState([]);
  const [shouldPlayAmbiance, setShouldPlayAmbiance] = useState(false);
  const [musicInterval, setMusicInterval] = useState();

  // Poems states
  const [vers, setVers] = useState();
  const [fontOpacity] = useState(new Animated.Value(0));
  const [index, setIndex] = useState(0);
  const [nbLines, setNbLines] = useState(4);
  const [fontSize] = useState(new Animated.Value(20));
  const [currentSpeed, setCurrentSpeed] = useState();
  const [walking, setWalking] = useState(false);

  /**
   * Mise à jour de la position du téléphone
   * @param location
   */
  const updateLocation = (location) => {
    if (isMounted) {
      setLongitude(location.coords.longitude);
      setLatitude(location.coords.latitude);
      setCurrentSpeed(location.coords.speed);
    }
  };

  useEffect(() => {
    if (!currentSpeed || currentSpeed === -1) return;
    setWalking(!(currentSpeed < 1));
  }, [currentSpeed]);

  /**
   * Mise à jour du type d'environnement lorsque la densité de pop change
   */
  useEffect(() => {
    if (isMounted && localityType === undefined) {
      setLocalityType(localityDensity < 250 ? 'country' : 'city');
    }
  }, [localityDensity]);

  /**
   * Lance la lecture de la musique
   */
  useEffect(() => {
    if (!isReadyToPlay) return;

    // On commence par démarrer la musique
    const musicFile = getMusic(moment);
    play(musicFile, 0.5).then((sound) => {
      setCurrentlyPlaying(currentlyPlaying.concat([sound]));
    });

    // Si la musique choisie permet d'ajouter un son d'ambiance, on le fait
    if (musicFile !== '../data/Musics/noon3.mp3') setShouldPlayAmbiance(true);
  }, [isReadyToPlay]);

  /**
   * Lance la lecture d'un son d'ambiance
   */
  useEffect(() => {
    if (!shouldPlayAmbiance) return;
    const ambianceFile = getAmbiance(localityType);
    play(ambianceFile, 1).then((sound) => {
      setCurrentlyPlaying(currentlyPlaying.concat([sound]));
    });
  }, [shouldPlayAmbiance]);

  /**
   * Lance la lecture des sons ponctuels
   */
  useEffect(() => {
    // La musique 3 n'admet pas non plus de son ponctuels
    if (!shouldPlayAmbiance) return;
    const oneOffFile = getOneOff(moment, vers);
    if (oneOffFile) play(oneOffFile, 1);
  }, [vers]);

  /**
   * Joue les sons lorsque l'accélération change
   */
  useEffect(() => {
    // On supprime l'intervalle précédent
    if (musicInterval) clearInterval(musicInterval);

    // On en crée un nouveau en fonction de l'accélération actuelle
    if (walking) {
      setMusicInterval(setInterval(() => {
        play(getAcceleration(), 0);
      }, 1500));
    }
  }, [walking]);

  const registerLocationServices = async () => {
    const locationAccuracy = Location.Accuracy.BestForNavigation;
    const location = await Location.getCurrentPositionAsync({
      accuracy: locationAccuracy,
    });

    // Mise à jour de la position
    updateLocation(location);

    // Récupération des données météo
    const weatherResponse = await weatherRequest(
      location.coords.latitude, location.coords.longitude,
    );
    setTemperature(weatherResponse.data.main.temp);
    // Inférer un état de la température
    if (temperature < 12) {
      setWeather('cold');
    } else if (temperature > 25) {
      setWeather('hot');
    } else {
      setWeather('sweet');
    }

    // Récupération des données de densité de pop
    const sedacResponse = await sedacLocationRequest(
      location.coords.latitude, location.coords.longitude,
    );
    if (sedacResponse.data.results[0]) {
      setLocalityDensity(sedacResponse.data.results[0].value.estimates[sedacDataset].MEAN);
    }

    // On update la position GPS en direct
    return Location.watchPositionAsync({
      accuracy: locationAccuracy,
      distanceInterval: 1,
      timeInterval: 1000,
    }, updateLocation);
  };

  /**
   * componentDidMount()
   * Démarrage de toutes les requêtes API
   * Lancé une seule fois au démarrage
   */
  useEffect(() => {
    setIsMounted(true);
    let subscriberRemove;
    registerLocationServices().then((removeMethod) => {
      subscriberRemove = removeMethod;
    });

    return () => {
      setIsMounted(false);
      if (subscriberRemove instanceof Function) subscriberRemove();
      // TODO : ne marche pas
      currentlyPlaying.forEach((sound) => {
        sound.unloadAsync();
      });
    };
  }, []);

  useEffect(() => {
    if (moment === 'nuit') setVers(`Dérive de la  ${moment}`);
    else setVers(`Dérive du ${moment}`);
    setTimeout(() => {
      setVers('Commencez à marcher');
    }, 5000);
  }, [moment]);

  useEffect(() => {
    fontOpacity.setValue(0);
    fadeTo(fontOpacity, 1);
  }, [vers]);

  useInterval(() => {
    if (
      !isMounted
      || !localityType
      || !weather
      || !season
      || !moment
      || !currentSpeed
      || !localityDensity
    ) return;

    if (!isReadyToPlay) setIsReadyToPlay(true);

    const text = getTextArray(moment);
    const relevantText = walking ? text.acceleration : text.stable;

    // Si on est arrivé à la fin du texte, on boucle
    if (relevantText.length < index + nbLines) {
      navigation.replace('Sas');
      return;
    }

    // Sinon, on génère le nouveau vers
    // Pour chaque ligne (dépend de la vitesse)
    let vers = '';
    let i;
    for (i = index; i < index + nbLines; i += 1) {
      // Si on atteint une nouvelle strophe, on n'ajoute plus de texte
      if (relevantText[i] === '\n' && i !== index) {
        i += 1;
        break;
      }
      // On récupère une partie du texte et on la fait varier avec interpretText
      vers += `\n${combine(relevantText[i], localityType, weather, season)}`;
    }
    setIndex(i);
    setVers(vers);

    if (walking) {
      setNbLines(Math.max(nbLines - 1, 2));
    } else {
      setNbLines(Math.min(nbLines + 1, 4));
    }
  }, 10000);

  useEffect(() => {
    let newFontSize = (currentSpeed ?? 0) * 25;
    newFontSize = Math.min(40, newFontSize); // Max font size : 40
    newFontSize = Math.max(20, newFontSize); // Min font size : 20
    fadeTo(fontSize, newFontSize, 1000, false);
  }, [currentSpeed]);

  return (
    <View style={styles.containerCamera}>
      <View style={styles.containerCamera}>
        <CCamera />
      </View>
      <View style={styles.containerText}>
        <TouchableOpacity onLongPress={() => {
          setDebug(!debug);
        }}
        >
          <Animated.View style={{ opacity: fontOpacity }}>
            <Animated.Text style={[styles.textVers, { fontSize }]}>
              {vers}
            </Animated.Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
      {debug
      && (
        <View style={styles.containerCaptorsTest}>
          <Text style={styles.textCaptorsTest}>Saison : {season}</Text>
          <Text style={styles.textCaptorsTest}>Moment : {moment}</Text>
          <Text style={styles.textCaptorsTest}>Vitesse : {currentSpeed}</Text>
          <Text style={styles.textCaptorsTest}>Lat / Lon : {latitude} / {longitude}</Text>
          <Text style={styles.textCaptorsTest}>Densité de pop : {localityDensity}</Text>
          <Text style={styles.textCaptorsTest}>Milieu : {localityType}</Text>
          <Text style={styles.textCaptorsTest}>Météo : {weather}</Text>
          <Text style={styles.textCaptorsTest}>Temperature : {temperature}</Text>
          <Text style={styles.textCaptorsTest}>Nb Lines : {nbLines}</Text>
        </View>
      )}
      {/* Back button */}
      <TouchableOpacity
        style={{
          flex: 1, position: 'absolute', bottom: 0, left: 0, marginBottom: 5, marginLeft: 5,
        }}
        onPress={() => navigation.replace('ChooseMode')}
      >
        <Ionicons name="md-arrow-back-circle-outline" size={32} color="darkgrey" />
      </TouchableOpacity>
      {/* Debug button */}
      <TouchableOpacity
        style={{
          flex: 1, position: 'absolute', bottom: 0, right: 0, marginBottom: 5, marginRight: 5,
        }}
        onPress={() => setDebug(!debug)}
      >
        <Ionicons name="md-information-circle-outline" size={32} color="darkgrey" />
      </TouchableOpacity>
    </View>
  );
};

TextPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

export default TextPage;
