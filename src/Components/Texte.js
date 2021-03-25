import React, {useEffect, useState, useRef} from 'react'
import {Audio} from "expo-av";
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';

import CCamera from './CCamera';
import {locationRequest, sedacLocationRequest, sedacDataset} from "../Helpers/location.js";
import * as Location from "expo-location";
import {calculateSaison, calculateMoment} from '../Helpers/time';
import {weatherRequest} from "../Helpers/weather";
import {getTextArray, interpretText} from "../Helpers/text";
import {getUrlSound, soundFor} from "../Helpers/sound";
import {ambianceNoiseFor} from "../Helpers/sound";
import {punctualNoiseFor} from "../Helpers/sound";

const Texte = ({ navigation }) => {
  const [timer, setTimer] = useState()
  const [isMounted, setIsMounted] = useState(true)
  const [text, setText] = useState()
  const [vers, setVers] = useState("Commencez à marcher !")
  const [coefPolice, setCoefPolice] = useState(1)
  const [coefTextSpeed, setCoefTextSpeed] = useState(5)
  const [nbLines, setNbLines] = useState(4)
  const [debug, setDebug] = useState(false)
  const [longitude, setLongitude] = useState()
  const [latitude, setLatitude] = useState()
  // const [speed, setSpeed] = useState()
  const [currentSpeed, setCurrentSpeed] = useState()
  const [activity, setActivity] = useState();
  const [localityDensity, setLocalityDensity] = useState()
  const [localityType, setLocalityType] = useState(navigation.getParam('localityType'))
  const [saison, setSaison] = useState(null)
  const [moment, setMoment] = useState(navigation.getParam('moment'))
  const [temperature, setTemperature] = useState(-100)
  const [weather, setWeather] = useState(navigation.getParam('weather'))
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
      console.log("udpate loc", location.coords.speed)
    }
  }

  /**
   * Mise à jour du temps de la journée
   */
  const updateTime = () => {
    if (isMounted) {
      let jDate = new Date();
      setSaison(calculateSaison(jDate.getMonth()));
      if (moment === undefined) {
        setMoment(calculateMoment(calculateSaison(jDate.getMonth()), jDate.getHours()));
      }
    }
  }

  /**
   * Mise à jour du type d'environnement lorsque la densité de pop change
   */
  useEffect(() => {
    if (isMounted && localityType === undefined) {
      setLocalityType(localityDensity < 1000 ? 'country' : 'city')
    }
  }, [localityDensity])

  /**
   * Mise à jour du texter lorsque le moment de la journée change
   */
  useEffect(() => {
    if (isMounted) {
      setText(getTextArray(moment))
    }
  }, [moment])

    /**
     * Démarrage du son lorsque le moment de la journée change
     */
    let music
    let urlSound
    let ambiance
    let punctual
    useEffect(() => {
        urlSound = (getUrlSound(moment))
        if(urlSound === "../data/Musics/midi_mus_3.mp3") music = soundFor(urlSound)
        else if (vers.includes("Partout") ||
                 vers.includes("Autre moment") ||
                 vers.includes("La nuit") ||
                 vers.includes("Déjà"))
        {
            music = soundFor(urlSound)
            ambiance = ambianceNoiseFor(localityType)
            setInterval(function (){
                punctual = punctualNoiseFor(moment)
            }, 10000)
        }
    }, [vers])

  /**
   * Démarrage du poème lorsque toutes les infos sont présentes
   */
  useEffect(() => {
    if (isMounted && localityType && weather && saison && text && timer == null) {
      _startTimer()
    }
  }, [currentSpeed])

    /**
     * Mise à jour des coefficients
     */

  useEffect(() => {
    if (isMounted) {
      let previousSpeed
      if (previousSpeed === undefined){
        previousSpeed = 0
      }
      if ( Math.round(currentSpeed * 100) / 100 > 0.3 + previousSpeed) {
        // setCoefTextSpeed(coefTextSpeed + 2)
        setCoefPolice(Math.min(coefPolice + 1,3))
        setNbLines(Math.max(nbLines - 1 ,2))
        setSpeedIncreased(true) 
      } else {
        // setCoefTextSpeed(coefTextSpeed - 2)
        setCoefPolice(Math.min(coefPolice -1 ,4))
        setNbLines(Math.max(nbLines + 1 ,2))
        setSpeedIncreased(false)
      }
      previousSpeed = currentSpeed
    }
  }, [currentSpeed])

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
      timeInterval: 100,
    }, updateLocation);

    return () => {
      setIsMounted(false)
      clearInterval(timer)
      clearInterval(timerInterval)
      locationWatcher.then(subscriber => {
        subscriber.remove()
      })
    }

  }, [])

  /**
   * Démarage du défilement du texte
   */
  const _startTimer = () => {
    if (isMounted) {
      let index = 0
      setTimer(useInterval(() => {
        // Si on est arrivé à la fin du texte, on boucle
        if (text.length < index + nbLines) {
          index = 0;
        }

        // Sinon, on génère le nouveau vers
        // Pour chaque ligne (dépend de la vitesse)
        let vers = ""
        console.log("nb line", nbLines)
        for (let i = 0; i < nbLines; i++) {
          // On récupère une partie du texte et on la fait varier avec interpretText
          vers += "\n" + interpretText(text[index], localityType, "stationary", saison, weather)
          index = index + 1
        }
        setVers(vers)
      }, 3000))
    }
  }

  const toogleDebug = () => {
    setDebug(!debug)
  }


  return (
    <View style={styles.mainContainer}>
      <View style={styles.cameraContener}>
        <CCamera/>
      </View>
      <View style={styles.textContainer}>
        <TouchableOpacity onLongPress={() => {
          toogleDebug()
        }}>
          <Text style={[styles.textOver, {fontSize: 20 * coefPolice}]}>
            {vers}
          </Text>
        </TouchableOpacity>
      </View>
      {debug &&
      <View style={styles.containerCaptors}>
        <Text style={styles.textCaptors}> Saison : {saison}  </Text>
        <Text style={styles.textCaptors}> Moment : {moment}  </Text>
        <Text style={styles.textCaptors}> Vitesse : {currentSpeed}  </Text>
        <Text style={styles.textCaptors}> Activité : {activity}  </Text>
        <Text style={styles.textCaptors}> Latitude : {latitude}  </Text>
        <Text style={styles.textCaptors}> Longitude : {longitude}  </Text>
        <Text style={styles.textCaptors}> Densité de pop : {localityDensity} </Text>
        <Text style={styles.textCaptors}> Milieu : {localityType}</Text>
        <Text style={styles.textCaptors}> Météo : {weather} </Text>
        <Text style={styles.textCaptors}> Temperature : {temperature}</Text>
        <Text style={styles.textCaptors}> NbLines : {nbLines}</Text>
        <Text style={styles.textCaptors}> TailleTexte : {coefPolice}</Text>
        </View>
        }
        <Button title="Retour"
          onPress={() => navigation.navigate('Menu')}>
        </Button>
      </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 10,
    justifyContent: 'center',
  },
  cameraContener: {
    flex: 9
  },
  textContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center'
  },
  textOver: {
    fontSize: 40,
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 10
  },
  containerCaptors: {
    flex: 1,
    position: 'absolute',
    bottom: '10%',
  },
  textCaptors: {
    fontSize: 12,
    // textAlign: 'center',
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 10
  }
});

export default Texte


function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}