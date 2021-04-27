import React, {useEffect, useState} from 'react'
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import useInterval from "@use-it/interval";
import {Ionicons} from '@expo/vector-icons';
import CCamera from './CCamera';
import {groupStyleSheet} from "../../Appcss";

import {sedacDataset, sedacLocationRequest} from "../Helpers/location.js";
import * as Location from "expo-location";
import {calculateMoment, calculateSeason} from '../Helpers/time';
import {weatherRequest} from "../Helpers/weather";
import {combine, fadeTo, getTextArray} from "../Helpers/text";
import {getAcceleration, getAmbiance, getMusic, getOneOff, play} from "../Helpers/sound";
import {useFonts} from "expo-font";

const TextGenerator = ({navigation}) => {

  const [loaded] = useFonts({
    'Antonio': require('../../assets/fonts/Antonio.ttf'),
  });

  // Page states
  const [isMounted, setIsMounted] = useState(true)
  const [debug, setDebug] = useState(false)

  //Localisation states 
  const [longitude, setLongitude] = useState()
  const [latitude, setLatitude] = useState()
  const [localityDensity, setLocalityDensity] = useState()
  const [localityType, setLocalityType] = useState(navigation.getParam('localityType'))
  const [season, setSeason] = useState(null)
  const [moment, setMoment] = useState(navigation.getParam('moment'))
  const [temperature, setTemperature] = useState(-100)
  const [weather, setWeather] = useState(navigation.getParam('weather'))

  //Music states
  const [isReadyToPlay, setIsReadyToPlay] = useState(false)
  const [currentlyPlaying, setCurrentlyPlaying] = useState([])
  const [shouldPlayAmbiance, setShouldPlayAmbiance] = useState(false)
  const [musicInterval, setMusicInterval] = useState()

  // Poems states
  const [vers, setVers] = useState()
  const [versOpacity] = useState(new Animated.Value(0))
  const [index, setIndex] = useState(0);
  const [nbLines, setNbLines] = useState(4)
  const [coefPolice, setCoefPolice] = useState(1)
  const [currentSpeed, setCurrentSpeed] = useState()
  const [previousSpeed, setPreviousSpeed] = useState()
  const [speedIncreased, setSpeedIncreased] = useState(false)


  /**
   * Mise à jour de la position du téléphone
   * @param location
   */
  const updateLocation = (location) => {
    if (isMounted) {
      setLongitude(location.coords.longitude)
      setLatitude(location.coords.latitude)
      setCurrentSpeed(location.coords.speed)
    }
  }
  /**
   * Mise à jour du temps de la journée
   */
  const updateTime = () => {
    if (isMounted) {
      setSeason(calculateSeason());
      if (moment === undefined) {
        setMoment(calculateMoment());
      }
    }
  }


  /**
   * Mise à jour du type d'environnement lorsque la densité de pop change
   */
  useEffect(() => {
    if (isMounted && localityType === undefined) {
      setLocalityType(localityDensity < 250 ? 'country' : 'city')
    }
  }, [localityDensity])

  /**
   * Lance la lecture de la musique
   */
  useEffect(() => {
    if (!isReadyToPlay) return

    // On commence par démarrer la musique
    let musicFile = getMusic(moment)
    play(musicFile).then((sound) => {
      setCurrentlyPlaying(currentlyPlaying.concat([sound]))
    })

    // Si la musique choisie permet d'ajouter un son d'ambiance, on le fait
    if (musicFile !== "../data/Musics/noon3.mp3") setShouldPlayAmbiance(true)

  }, [isReadyToPlay])

  /**
   * Lance la lecture d'un son d'ambiance
   */
  useEffect(() => {
    if (!shouldPlayAmbiance) return
    let ambianceFile = getAmbiance(localityType)
    play(ambianceFile).then((sound) => {
      setCurrentlyPlaying(currentlyPlaying.concat([sound]))
    })
  }, [shouldPlayAmbiance])

  /**
   * Lance la lecture des sons ponctuels
   */
  useEffect(() => {
    // La musique 3 n'admet pas non plus de son ponctuels
    if (!shouldPlayAmbiance) return
    let oneOffFile = getOneOff(moment, vers)
    if (oneOffFile) play(oneOffFile)
  }, [vers])

  /**
   * Joue les sons lorsque l'accélération change
   */
  useEffect(() => {
    // On supprime l'intervalle précédent
    if (musicInterval) clearInterval(musicInterval)

    // On en crée un nouveau en fonction de l'accélération actuelle
    if (speedIncreased) {
      setMusicInterval(setInterval(() => {
        play(getAcceleration())
      }, 1500))
    } else {
      setMusicInterval(setInterval(() => {
        play(getAcceleration())
      }, 4000))
    }

  }, [speedIncreased])

  /**
   * componentDidMount()
   * Démarrage de toutes les requêtes API
   * Lancé une seule fois au démarrage
   */
  useEffect(() => {
    setIsMounted(true);
    // Mise à jour du moment de la journée
    updateTime();
    let timerInterval = setInterval(updateTime, 60000);

    Location.getCurrentPositionAsync().then((location) => {
      // Mise à jour de la position
      updateLocation(location)

      // Récupération des données météo
      weatherRequest(location.coords.latitude, location.coords.longitude)
        .then(response => {
          if (isMounted) {
            setTemperature(response.data.main.temp)
            // Inférer un état de la température
            if (temperature < 12) {
              setWeather("cold")
            } else if (temperature > 25) {
              setWeather("hot")
            } else {
              setWeather("sweet")
            }
          }
        })

      // Récupération des données de densité de pop
      sedacLocationRequest(location.coords.latitude, location.coords.longitude)
        .then(response => {
          if (isMounted && response.data.results[0]) {
            setLocalityDensity(response.data.results[0].value.estimates[sedacDataset].MEAN)
          }
        })
    })

    // On update la position GPS en direct
    let locationWatcher = Location.watchPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
      distanceInterval: 1,
      timeInterval: 1000,
    }, updateLocation);

    return () => {
      setIsMounted(false)
      clearInterval(timerInterval)
      locationWatcher.then(subscriber => {
        subscriber.remove()
      })
      // TODO : ne marche pas
      currentlyPlaying.forEach((sound) => {
        sound.unloadAsync()
      })
    }

  }, [])

  useEffect(() => {
    if (currentSpeed - previousSpeed > 0.3) {
      setCoefPolice(Math.min(coefPolice + 1, 3))
      setNbLines(Math.max(nbLines - 1, 2))
      setSpeedIncreased(true)
    } else if (currentSpeed - previousSpeed < 0.5) {
      setCoefPolice(Math.max(coefPolice - 1, 1))
      setNbLines(Math.min(nbLines + 1, 4))
      setSpeedIncreased(false)
    }
    setPreviousSpeed(currentSpeed)
  }, [currentSpeed])

  useEffect(() => {
    if (moment === "nuit") setVers("Dérive de la  " + moment)
    else setVers("Dérive du " + moment)
    setTimeout(() => {
      setVers("Commencez à marcher")
    }, 5000)
  }, [moment])

  useEffect(() => {
    versOpacity.setValue(0)
    fadeTo(versOpacity, 1)
  }, [vers])

  useInterval(() => {
    if (!isMounted || !localityType || !weather || !season || !moment || !currentSpeed || !localityDensity) return

    if (!isReadyToPlay) setIsReadyToPlay(true)

    let text = getTextArray(moment)
    let relevantText = speedIncreased ? text.acceleration : text.stable

    // Si on est arrivé à la fin du texte, on boucle
    if (relevantText.length < index + nbLines) {
      navigation.replace('Sas')
      return;
    }

    // Sinon, on génère le nouveau vers
    // Pour chaque ligne (dépend de la vitesse)
    let vers = ""

    for (let i = index; i < index + nbLines; i++) {
      // On récupère une partie du texte et on la fait varier avec interpretText
      vers += "\n" + combine(relevantText[i], localityType, weather, season)
    }
    setIndex(index + nbLines)
    setVers(vers)
  }, 12000)

  if (!loaded) {
    return null;
  }
  
  return (
    <View style={styles.mainContainer}>
      <View style={styles.cameraContener}>
        <CCamera/>
      </View>
      <View style={styles.textContainer}>
        <TouchableOpacity onLongPress={() => {
          setDebug(!debug)
        }}>
          <Animated.Text style={[styles.textOver, {fontSize: 20 * coefPolice, opacity: versOpacity}]}>
            {vers}
          </Animated.Text>
        </TouchableOpacity>
      </View>
      {debug &&
      <View style={styles.containerCaptors}>
        <Text style={styles.textCaptors}> Saison : {season}  </Text>
        <Text style={styles.textCaptors}> Moment : {moment}  </Text>
        <Text style={styles.textCaptors}> Vitesse : {currentSpeed}  </Text>
        <Text style={styles.textCaptors}> Accélération : {speedIncreased ? 'Oui' : 'Non'}  </Text>
        <Text style={styles.textCaptors}> Latitude : {latitude}  </Text>
        <Text style={styles.textCaptors}> Longitude : {longitude}  </Text>
        <Text style={styles.textCaptors}> Densité de pop : {localityDensity} </Text>
        <Text style={styles.textCaptors}> Milieu : {localityType}</Text>
        <Text style={styles.textCaptors}> Météo : {weather} </Text>
        <Text style={styles.textCaptors}> Temperature : {temperature}</Text>
        <Text style={styles.textCaptors}> Nb Lines : {nbLines}</Text>
        <Text style={styles.textCaptors}> Coeff Police : {coefPolice}</Text>

      </View>
      }
      {/* Back button */}
      <TouchableOpacity
        style={{flex: 1, position: 'absolute', bottom: 0, left: 0, marginBottom: 5, marginLeft: 5}}
        onPress={() => navigation.navigate('WelcomeScreen')}>
        <Ionicons name="md-arrow-back-circle-outline" size={32} color="darkgrey"/>
      </TouchableOpacity>
      {/* Debug button */}
      <TouchableOpacity
        style={{flex: 1, position: 'absolute', bottom: 0, right: 0, marginBottom: 5, marginRight: 5}}
        onPress={() => setDebug(!debug)}>
        <Ionicons name="md-information-circle-outline" size={32} color="darkgrey"/>
      </TouchableOpacity>
    </View>
  )
}

const styles = groupStyleSheet.styleTexte

export default TextGenerator
