import React, {useEffect, useState} from 'react'
import {Modal, StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';

import CCamera from './CCamera';
import {sedacLocationRequest, sedacDataset} from "../Helpers/location.js";
import {Ionicons} from '@expo/vector-icons';
import * as Location from "expo-location";
import {calculateSaison, calculateMoment} from '../Helpers/time';
import {weatherRequest} from "../Helpers/weather";
import {getTextArray, interpretText} from "../Helpers/text";
import {getUrlSound, soundFor} from "../Helpers/sound";
import {ambianceNoiseFor} from "../Helpers/sound";
import {punctualNoiseFor} from "../Helpers/sound";
import OptionsModal from "./OptionsModal";

const Texte = ({navigation}) => {
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
    const [speed, setSpeed] = useState()
    const [activity, setActivity] = useState();
    const [localityDensity, setLocalityDensity] = useState()
    const [localityType, setLocalityType] = useState(navigation.getParam('localityType'))
    const [saison, setSaison] = useState(null)
    const [moment, setMoment] = useState(navigation.getParam('moment'))
    const [temperature, setTemperature] = useState(-100)
    const [weather, setWeather] = useState(navigation.getParam('weather'))

    /**
     * Mise à jour de la position du téléphone
     * @param location
     */
    const updateLocation = (location) => {
        if (isMounted) {
            setLongitude(location.coords.longitude)
            setLatitude(location.coords.latitude)
            setSpeed(location.coords.speed)
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
    })

    /**
     * Mise à jour des coefficients
     */
    useEffect(() => {
        if (isMounted) {
            if (speed < 2) {
                setActivity('stationary')
                setCoefTextSpeed(5)
                setCoefPolice(1)
                setNbLines(4)

            } else if (speed < 6.4) {
                setActivity('walking')
                setCoefTextSpeed(5)
                setCoefPolice(2)
                setNbLines(3)

            } else if (speed < 8) {
                setActivity('running')
                setCoefTextSpeed(3)
                setCoefPolice(3)
                setNbLines(2)
            }
            else if (speed < 30) {
                setActivity('cycling')
                setCoefTextSpeed(1)
                setCoefPolice(4)
                setNbLines(1)
            } else {
                setActivity('in_vehicle')
                setCoefTextSpeed(1)
                setCoefPolice(4)
                setNbLines(1)
            }
        }
    }, [speed])

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
            distanceInterval: 1
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
            setTimer(setInterval(() => {
                // Si on est arrivé à la fin du texte, on boucle
                if (text.length < index + nbLines) {
                    navigation.replace('Sas')
                    return
                }

                // Sinon, on génère le nouveau vers
                // Pour chaque ligne (dépend de la vitesse)
                let vers = ""
                for (let i = 0; i < nbLines; i++) {
                    // On récupère une partie du texte et on la fait varier avec interpretText
                    vers += "\n" + interpretText(text[index], localityType, activity, saison, weather)
                    index = index + 1
                }
                setVers(vers)
            }, coefTextSpeed * 1000))
        }
    }


    return (
        <View style={styles.mainContainer}>
            <View style={styles.cameraContener}>
                <CCamera/>
            </View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={debug}>
                <View style={{marginTop: 30}}>
                    <OptionsModal
                        latitude={latitude}
                        longitude={longitude}
                        localityDensity={localityDensity}
                        localityType={localityType}
                        speed={speed}
                        activity={activity}
                        temperature={temperature}
                        weather={weather}
                        saison={saison}
                        moment={moment}
                    ></OptionsModal>
                    <Button title='Fermer'
                            onPress={() => {
                                setDebug(!debug);
                            }}></Button>
                </View>
            </Modal>
            <View style={styles.textContainer}>
                <Text style={[styles.textOver, {fontSize: 20 * coefPolice}]}>
                    {vers}
                </Text>
            </View>
            {/* Debug button */}
            <TouchableOpacity
                style={{flex: 1, position: 'absolute', bottom: 0, right: 0, marginBottom: 5, marginRight: 5}}
                onPress={() => setDebug(!debug)}>
                <Ionicons name="md-information-circle-outline" size={32} color="darkgrey"/>
            </TouchableOpacity>
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





