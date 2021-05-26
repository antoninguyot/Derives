import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Animated, View } from 'react-native';
import useInterval from '@use-it/interval';
import * as Location from 'expo-location';
import styles from '../../App.css';
import { sedacDataset, sedacLocationRequest } from '../Helpers/location';
import { calculateMoment, calculateSeason } from '../Helpers/time';
import weatherRequest from '../Helpers/weather';
import { getTextArray } from '../Helpers/text';
import { fadeTo } from '../Helpers/anim';
import {
  getAcceleration, getAmbiance, getMusic, play,
} from '../Helpers/sound';
import Debug from '../Components/Debug';
import TextPoem from '../Components/TextPoem';
import AudioPoem from '../Components/AudioPoem';
import BackIcon from '../Components/BackIcon';
import DebugIcon from '../Components/DebugIcon';
import SwitchModeIcon from '../Components/SwitchModeIcon';

const PoemPage = ({ navigation }) => {
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
  const [shouldPlayAmbiance, setShouldPlayAmbiance] = useState(false);
  const [musicInterval, setMusicInterval] = useState();

  // Poems states
  const [mode, setMode] = useState(navigation.getParam('mode', 'read'));
  const [fontOpacity] = useState(new Animated.Value(0));
  const [stropheIndex, setStropheIndex] = useState(-1);
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
    let musicSound;

    // On commence par démarrer la musique
    const musicFile = getMusic(moment);
    play(musicFile, 0.25)
      .then((sound) => {
        musicSound = sound;
      });

    // Si la musique choisie permet d'ajouter un son d'ambiance, on le fait
    if (musicFile !== '../data/Musics/noon3.mp3') setShouldPlayAmbiance(true);

    // Arrêt de la musique lors de l'unmount
    return () => {
      musicSound.unloadAsync();
    };
  }, [isReadyToPlay]);

  /**
   * Lance la lecture d'un son d'ambiance
   */
  useEffect(() => {
    if (!shouldPlayAmbiance) return;
    const ambianceFile = getAmbiance(localityType);
    let ambianceSound;
    play(ambianceFile, 0.5)
      .then((sound) => {
        ambianceSound = sound;
      });

    // Arrêt du son lors de l'unmount
    return () => {
      ambianceSound.unloadAsync();
    };
  }, [shouldPlayAmbiance]);

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
    registerLocationServices()
      .then((removeMethod) => {
        subscriberRemove = removeMethod;
      });

    return () => {
      setIsMounted(false);
      if (subscriberRemove instanceof Function) subscriberRemove();
    };
  }, []);

  useEffect(() => {
    fontOpacity.setValue(0);
    fadeTo(fontOpacity, 1);
  }, [stropheIndex]);

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
    if (relevantText.length < stropheIndex) {
      navigation.replace('Sas', { momentPlayed: moment });
      return;
    }
    setStropheIndex(stropheIndex + 1);
  }, 10000);

  useEffect(() => {
    let newFontSize = (currentSpeed ?? 0) * 25;
    newFontSize = Math.min(40, newFontSize); // Max font size : 40
    newFontSize = Math.max(20, newFontSize); // Min font size : 20
    fadeTo(fontSize, newFontSize, 1000, false);
  }, [currentSpeed]);

  return (
    <View style={styles.containerCamera}>
      {mode === 'read'
      && (
      <TextPoem
        fontOpacity={fontOpacity}
        fontSize={fontSize}
        stropheIndex={stropheIndex}
        walking={walking}
        localityType={localityType}
        weather={weather}
        season={season}
        isReadyToPlay={isReadyToPlay}
      />
      )
      || <AudioPoem stropheIndex={stropheIndex} walking={walking} isReadyToPlay={isReadyToPlay} />}
      {debug
      && (
        <Debug
          season={season}
          moment={moment}
          currentSpeed={currentSpeed}
          latitude={latitude}
          longitude={longitude}
          localityDensity={localityDensity}
          localityType={localityType}
          weather={weather}
          temperature={temperature}
          walking={walking}
        />
      )}
      <SwitchModeIcon mode={mode} onPress={() => setMode(mode === 'read' ? 'listen' : 'read')} />
      {/* Back button */}
      <BackIcon onPress={() => navigation.replace('ChooseMode', { mode })} />
      {/* Debug button */}
      <DebugIcon onPress={() => setDebug(!debug)} />
    </View>
  );
};

PoemPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

export default PoemPage;
