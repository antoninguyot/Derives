import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'

import CCamera from './CCamera'
import {TextGenerator, setTextArray, interpretText} from "../Helpers/TextGenerator";
import {locationRequest} from "../Helpers/locationRequests.js"
import * as Location from "expo-location";
import SoundGenerator from "../Helpers/SoundGenerator";


const TextDispatcher = () => {

    const [isMounted, setIsMounted] = useState(false)
    const [timer, setTimer] = useState()
    const [index, setIndex] = useState(0)
    const [timerPaused, setTimerPaused] = useState(true)
    const [weather, setWeather] = useState()
    const [location, setLocation] = useState()
    const [time, setTime] = useState()
    const [text, setText] = useState()
    const [sound, setSound] = useState()
    const [vers, setVers] = useState("Commencez à marcher !")
    const [coefPolice, setCoefPolice] = useState(1)
    const [coefTextSpeed, setCoefTextSpeed] = useState(5)
    const [nbLines, setNbLines] = useState(4)
    const [debug, setDebug] = useState(false)
    const [longitude, setLongitude] = useState()
    const [latitude, setLatitude] = useState()
    const [speed, setSpeed] = useState()
    const [localityName, setLocalityName] = useState()
    const [localityPopulation, setLocalityPopulation] = useState()
    const [localitySurface, setLocalitySurface] = useState()
    const [localityDensity, setLocalityDensity] = useState()
    const [localityType, setLocalityType] = useState()

    const updateLocation = (location) => {
        // On ne veut faire une requête API que la première fois
        let doLocationRequest = (latitude === undefined);

        setLongitude(location.coords.longitude)
        setLatitude(location.coords.latitude)
        setSpeed(location.coords.speed)

        if (doLocationRequest) {
            locationRequest(location.coords.latitude, location.coords.longitude)
                .then((function (response) {
                    let locality = response.data[0];
                    if (locality) {
                        setLocalityName(locality.nom)
                        setLocalityPopulation(locality.population)
                        setLocalitySurface(locality.surface)
                        setLocalityDensity(locality.population * 100 / locality.surface)
                        setLocalityType(locality.population * 100 / locality.surface >= 376 ? 'city' : 'country')
                    }
                }))
        }
    }

    // equivalent du didMount
    useEffect(() => {

        // Location
        Location.requestPermissionsAsync()

        Location.getCurrentPositionAsync().then(updateLocation)
        // On update la position GPS en direct
        Location.watchPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
            distanceInterval: 1
        }, updateLocation);

        // Séquence de démarrage de la vue texte
        setIsMounted(true)

    }, [isMounted, setIsMounted])

    //SON
    useEffect(() =>{
          SoundGenerator(time)
    })

    // Démarage du défilement du texte
    const _startTimer = () => {
        if (timerPaused) {
            setTimerPaused(false)
            setTimer(setInterval(), coefTextSpeed * 1000)
        }
    }

    const setInterval = () => {
        // Si on est arrivé à la fin du texte, on boucle
        if (index >= 5) {
            setIndex(0)
        } else {
            // Sinon, on génère le nouveau vers
            vers = ""
            // Pour chaque ligne (dépend de la vitesse)
            for (var i = 0; i < nbLines; i++) {
                if (index < 5) {
                    // On récupère une partie du texte et on la fait varier avec interpretText
                    vers = vers + "\n" + interpretText(text.text[index], location, weather, time)
                    setIndex(index + 1)
                }
            }
        }
    }

    const _stopTimer = () => {
        clearInterval(timer)
        setTimerPaused(true)
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
                    <Text style={[styles.textOver, {fontSize: 20 * coefPolice}]}>
                        {vers}
                    </Text>
                </TouchableOpacity>
            </View>
            {debug &&
            <View style={styles.containerCaptors}>
                {/*<Text style={styles.textCaptors}> Saison : {time.saison}  </Text>*/}
                {/*<Text style={styles.textCaptors}> Moment : {time.moment}  </Text>*/}
                <Text style={styles.textCaptors}> Vitesse : {speed}  </Text>
                <Text style={styles.textCaptors}> Latitude : {latitude}  </Text>
                <Text style={styles.textCaptors}> Longitude : {longitude}  </Text>
                <Text style={styles.textCaptors}> Ville : {localityName}  </Text>
                <Text style={styles.textCaptors}> Densité de pop : {localityDensity} </Text>
                <Text style={styles.textCaptors}> Milieu : {localityType}</Text>
                {/*<Text style={styles.textCaptors}> Météo : {weather.heat} </Text>*/}
                {/*<Text style={styles.textCaptors}> Temperature : {weather.temperature}</Text>*/}
            </View>
            }
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

export default TextDispatcher
