import React, {useEffect, useState} from 'react'
import {Modal,StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';

import CCamera from './CCamera';
import {sedacLocationRequest, sedacDataset} from "../Helpers/location.js";
import {Ionicons} from '@expo/vector-icons';
import * as Location from "expo-location";
import {calculateSaison, calculateMoment} from '../Helpers/time';
import {weatherRequest} from "../Helpers/weather";
import {combine, getTextArray, interpretText} from "../Helpers/text";
import {getUrlSound, soundFor} from "../Helpers/sound";
import {ambianceNoiseFor} from "../Helpers/sound";
import {punctualNoiseFor} from "../Helpers/sound";
import useInterval from "@use-it/interval";
import OptionsModal from "./OptionsModal";
import {groupStyleSheet} from "../../Appcss";

const Texte = ({navigation}) => {
  const [timer, setTimer] = useState()
  const [isMounted, setIsMounted] = useState(true)
  const [debug, setDebug] = useState(false)
  const [debugModal, setDebugModal] = useState(false)
  const [longitude, setLongitude] = useState()
  const [latitude, setLatitude] = useState()
  const [activity, setActivity] = useState();
  const [localityDensity, setLocalityDensity] = useState()
  const [localityType, setLocalityType] = useState(navigation.getParam('localityType'))
  const [saison, setSaison] = useState(null)
  const [moment, setMoment] = useState(navigation.getParam('moment'))
  const [temperature, setTemperature] = useState(-100)
  const [weather, setWeather] = useState(navigation.getParam('weather'))

  // State concernant le poème écrit
  const [vers, setVers] = useState("Commencez à marcher !")
  const [index, setIndex] = useState(0);
  const [nbLines, setNbLines] = useState(4)
  const [coefPolice, setCoefPolice] = useState(1)
  const [coefTextSpeed, setCoefTextSpeed] = useState(5)
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
          setSaison(calculateSaison());
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
      setLocalityType(localityDensity < 1000 ? 'country' : 'city')
    }
  }, [localityDensity])

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
     * Mise à jour des coefficients
     */

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
      clearInterval(timer)
      clearInterval(timerInterval)
      locationWatcher.then(subscriber => {
        subscriber.remove()
      })
    }

  }, [])

  const toogleDebug = () => {
    setDebug(!debug)
  }

  useEffect(() => {
    if ( currentSpeed - previousSpeed > 0.3) {
      // setCoefTextSpeed(coefTextSpeed + 2)
      setCoefPolice(Math.min(coefPolice + 1 ,3))
      setNbLines(Math.max(nbLines - 1 ,2))
      setSpeedIncreased(true)
    } else if (currentSpeed - previousSpeed < 0.5) {
      // setCoefTextSpeed(coefTextSpeed - 2)
      setCoefPolice(Math.max(coefPolice - 1,1))
      setNbLines(Math.min(nbLines + 1 ,4))
      setSpeedIncreased(false)
    }
    setPreviousSpeed(currentSpeed)
  }, [currentSpeed])

  useInterval(() => {
    if(!isMounted || !localityType || !weather || !saison || !moment || !currentSpeed || !localityDensity) {
      return;
    }

    let text = getTextArray('matin')
    let relevantText = speedIncreased ? text.acceleration : text.stable

    // Si on est arrivé à la fin du texte, on boucle
    if (relevantText.length < index + nbLines) {
      navigation.replace('Sas')
      return;
    }

    // Sinon, on génère le nouveau vers
    // Pour chaque ligne (dépend de la vitesse)
    let vers = ""
    let tmpIndex = index // très sale

    for (let i = index; i < index + nbLines; i++) {
      // On récupère une partie du texte et on la fait varier avec interpretText
      vers += "\n" + combine(relevantText[i], localityType, weather)
    }
    setIndex(index + nbLines)
    setVers(vers)
  }, 12000)

  return (
    <View style={styles.mainContainer}>
        <View style={styles.cameraContener}>
            <CCamera/>
        </View>
        <Modal
            animationType="slide"
            transparent={false}
            visible={debugModal}>
            <View style={{marginTop: 50}}>
                <OptionsModal
                    latitude={latitude}
                    longitude={longitude}
                    localityDensity={localityDensity}
                    localityType={localityType}
                    speed={currentSpeed}
                    activity={activity}
                    temperature={temperature}
                    weather={weather}
                    saison={saison}
                    moment={moment}
                ></OptionsModal>
                <Button title='Fermer'
                        onPress={() => {
                            setDebugModal(!debugModal);
                        }}></Button>
            </View>
        </Modal>
        <View style={styles.textContainer}>
            <TouchableOpacity onLongPress={() => {
                setDebug(!debug)
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
            onPress={() => navigation.navigate('Accueil')}>
            <Ionicons name="md-arrow-back-circle-outline" size={32} color="darkgrey"/>
        </TouchableOpacity>
        {/* Debug button */}
        <TouchableOpacity
            style={{flex: 1, position: 'absolute', bottom: 0, right: 0, marginBottom: 5, marginRight: 5}}
            onPress={() => setDebugModal(!debugModal)}>
            <Ionicons name="md-information-circle-outline" size={32} color="darkgrey"/>
        </TouchableOpacity>
    </View>
  )
}

const styles = groupStyleSheet.styleTexte

export default Texte
