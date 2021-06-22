import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Animated, View } from 'react-native';
import useInterval from '@use-it/interval';
import * as Location from 'expo-location';
import styles from '../../App.css';
import { calculateMoment, calculateNextMoment, calculateSeason } from '../Helpers/time';
import weatherRequest from '../Helpers/weather';
import { getTextArray } from '../Helpers/text';
import { fadeTo } from '../Helpers/anim';
import { getAmbiance, getMusic, play } from '../Helpers/sound';
import Debug from '../Components/Debug';
import TextPoem from '../Components/TextPoem';
import AudioPoem from '../Components/AudioPoem';
import DebugIcon from '../Components/DebugIcon';
import SwitchModeIcon from '../Components/SwitchModeIcon';
import ForwardIcon from '../Components/ForwardIcon';
import { worldPopLocationRequest } from '../Helpers/location';
import CheatIcon from '../Components/CheatIcon';
import CheatModal from '../Components/CheatModal';
import CreditsIcon from '../Components/CreditsIcon';
import CreditsModal from '../Components/CreditsModal';

const PoemPage = ({ route, navigation }) => {
  // Page states
  const [isMounted, setIsMounted] = useState(true);
  const [debug, setDebug] = useState(false);
  const [showCheat, setShowCheat] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

  // Localisation states
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [populationDensity, setPopulationDensity] = useState();
  const [localityType, setLocalityType] = useState(route.params.localityType ?? null);
  const [temperature, setTemperature] = useState(-100);
  const [weather, setWeather] = useState(route.params.weather ?? null);

  // Music states
  const [isReadyToPlay, setIsReadyToPlay] = useState(false);
  const [shouldPlayAmbiance, setShouldPlayAmbiance] = useState(false);

  // Poems states
  const [mode, setMode] = useState(route.params.mode);
  const [fontOpacity] = useState(new Animated.Value(0));
  const [stropheIndex, setStropheIndex] = useState(-1);
  const [fontSize] = useState(new Animated.Value(20));
  const [currentSpeed, setCurrentSpeed] = useState();
  const [walking, setWalking] = useState(false);

  const moment = route.params.moment ?? calculateMoment();
  const season = route.params.season ?? calculateSeason();

  useEffect(() => {
    if (!currentSpeed || currentSpeed === -1) return;
    setWalking(!(currentSpeed < 1));
  }, [currentSpeed]);

  /**
   * Mise à jour du type d'environnement lorsque la densité de pop change
   */
  useEffect(() => {
    if (localityType !== null) return;
    setLocalityType(populationDensity < 1000 ? 'country' : 'city');
  }, [populationDensity]);

  /**
   * Mise à jour de la météo lorsque la température change
   */
  useEffect(() => {
    if (temperature === -100) return;
    if (temperature < 12) {
      setWeather('cold');
    } else if (temperature > 25) {
      setWeather('hot');
    } else {
      setWeather('sweet');
    }
  }, [temperature]);

  /**
   * Lance la lecture de la musique
   */
  useEffect(() => {
    if (!isReadyToPlay) return;
    let musicSound;

    // On commence par démarrer la musique
    const musicFile = getMusic(moment);
    play(musicFile, 0.2, true)
      .then((sound) => {
        musicSound = sound;
      });

    // Si la musique choisie permet d'ajouter un son d'ambiance, on le fait
    if (musicFile !== '../data/Musics/noon3.mp3') setShouldPlayAmbiance(true);

    // Arrêt de la musique lors de l'unmount
    // eslint-disable-next-line consistent-return
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
    play(ambianceFile, 0.2, true)
      .then((sound) => {
        ambianceSound = sound;
      });

    // Arrêt du son lors de l'unmount
    // eslint-disable-next-line consistent-return
    return () => {
      ambianceSound.unloadAsync();
    };
  }, [shouldPlayAmbiance]);

  /**
   * componentDidMount()
   * Démarrage de toutes les requêtes API
   * Lancé une seule fois au démarrage
   */
  useEffect(() => {
    setIsMounted(true);

    (async () => {
      let currentLocation;
      // Si on a une localisation en cache, on l'utilise pour les premières requêtes
      currentLocation = await Location.getLastKnownPositionAsync({
        maxAge: 60000,
        requiredAccuracy: 1000,
      });
      // Sinon, on fait une requête avec une faible précision (+ rapide)
      if (currentLocation == null) {
        currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
      }
      // Première requête async pour la météo
      // noinspection ES6MissingAwait
      (async () => {
        if (weather !== null) return;
        setTemperature(await weatherRequest(
          currentLocation.coords.longitude, currentLocation.coords.latitude,
        ));
      })();
      // Seconde requête async pour la population
      // noinspection ES6MissingAwait
      (async () => {
        setPopulationDensity(await worldPopLocationRequest(
          currentLocation.coords.longitude, currentLocation.coords.latitude,
        ));
      })();
    })();

    let subscriberRemove;
    Location.watchPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
      distanceInterval: 1,
      timeInterval: 1000,
    }, (location) => {
      setLongitude(location.coords.longitude);
      setLatitude(location.coords.latitude);
      setCurrentSpeed(location.coords.speed);
    }).then(({ remove }) => { subscriberRemove = remove; });

    return () => {
      setIsMounted(false);
      if (subscriberRemove instanceof Function) subscriberRemove();
    };
  }, []);

  useEffect(() => {
    fontOpacity.setValue(0);
    fadeTo(fontOpacity, 1);
  }, [stropheIndex]);

  useEffect(() => {
    if (mode !== 'sas') return;
    setTimeout(() => {
      navigation.replace('TextGenerator', { moment: calculateNextMoment(moment) });
    }, 5000);
  }, [mode]);

  useInterval(() => {
    if (
      !isMounted
      || !localityType
      || !weather
      || !season
      || currentSpeed == null
      || populationDensity == null
    ) return;

    if (!isReadyToPlay) setIsReadyToPlay(true);

    const text = getTextArray(moment);
    const relevantText = walking ? text.acceleration : text.stable;

    // Si on est arrivé à la fin du texte, on boucle
    if (relevantText.length <= (stropheIndex + 1)) {
      setMode('sas');
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
      <CheatModal
        route={route}
        navigation={navigation}
        close={() => setShowCheat(!showCheat)}
        visible={showCheat}
      />
      <CreditsModal close={() => setShowCredits(!showCredits)} visible={showCredits} />
      {
        {
          read: <TextPoem
            moment={moment}
            fontOpacity={fontOpacity}
            fontSize={fontSize}
            stropheIndex={stropheIndex}
            walking={walking}
            localityType={localityType}
            weather={weather}
            season={season}
            isReadyToPlay={isReadyToPlay}
          />,
          listen: <AudioPoem
            moment={moment}
            stropheIndex={stropheIndex}
            walking={walking}
            isReadyToPlay={isReadyToPlay}
          />,
          sas: <ForwardIcon />,
        }[mode]
      }
      {debug
      && (
        <Debug
          season={season}
          moment={moment}
          currentSpeed={currentSpeed}
          latitude={latitude}
          longitude={longitude}
          localityDensity={populationDensity}
          localityType={localityType}
          weather={weather}
          temperature={temperature}
          walking={walking}
        />
      )}
      <SwitchModeIcon mode={mode} onPress={() => setMode(mode === 'read' ? 'listen' : 'read')} />
      <CheatIcon onPress={() => setShowCheat(!showCheat)} />
      <CreditsIcon onPress={() => setShowCredits(!showCredits)} />
      <DebugIcon onPress={() => setDebug(!debug)} />
    </View>
  );
};

PoemPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.object.isRequired,
};

export default PoemPage;
