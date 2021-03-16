import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native'

import CCamera from './CCamera'
import {locationRequest} from "../Helpers/location.js"
import * as Location from "expo-location";
import {calculateSaison, calculateMoment} from '../Helpers/time';
import {weatherRequest} from "../Helpers/weather";
import {getTextArray, interpretText} from "../Helpers/text";

const Texte = ({ navigation }) => {
    const [timer, setTimer] = useState()
    const [timerPaused, setTimerPaused] = useState(true)
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
    const [localityDensity, setLocalityDensity] = useState()
    const [localityType, setLocalityType] = useState(navigation.getParam('localityType'))
    const [saison, setSaison] = useState(null)
    const [moment, setMoment] = useState(navigation.getParam('moment'))
    const [temperature, setTemperature] = useState(-100)
    const [weather, setWeather] = useState(navigation.getParam('weather'))
    const [sunset, setSunset] = useState(0)

    const updateLocation = (location) => {

        setLongitude(location.coords.longitude)
        setLatitude(location.coords.latitude)
        setSpeed(location.coords.speed)

        // On ne veut faire une requête API que la première fois
        if (localityName !== undefined) {
            return;
        }

        locationRequest(location.coords.latitude, location.coords.longitude)
            .then((response) => {
                let locality = response.data[0];
                if (locality) {
                    setLocalityName(locality.nom)
                    setLocalityDensity(locality.population * 100 / locality.surface)
                    if (localityType === undefined) {
                        setLocalityType(locality.population * 100 / locality.surface >= 376 ? 'city' : 'country')
                    }
                }
            })
    }

    const updateTime = () => {
        let jDate = new Date();
        setSaison(calculateSaison(jDate.getMonth()));
        if (moment === undefined){
            setMoment(calculateMoment(calculateSaison(jDate.getMonth()), jDate.getHours()));
        }
    }

    // Initilise toutes les valeurs 
    useEffect(() => {

        // Location
        Location.requestPermissionsAsync()
        Location.getCurrentPositionAsync().then(updateLocation)

        // On update la position GPS en direct
        Location.watchPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
            distanceInterval: 1
        }, updateLocation);

        // Moment, Saison et Meteo
        if (latitude !== undefined) {
            updateTime();
            weatherRequest(latitude, longitude)
                .then((response) => {
                    setTemperature(response.data.main.temp)
                    setSunset(response.data.sys.sunset)

                    // Inférer un état de la température
                    if (temperature < 12) {
                        setWeather("cold")
                    } else if (temperature > 25) {
                        setWeather("hot")
                    } else {
                        setWeather("sweet")
                    }
                })
        }

        //Text 
        if (saison !== undefined) {
            setText(getTextArray(moment))
        }

        // Time
        setInterval(updateTime, 60000);

        if (text !== undefined) {
            _startTimer()
        }

    }, [moment, saison, longitude, latitude, timer, timerPaused, vers]) 

    useEffect(() => {
        console.log('Component did mount (it runs only once)');
        return () => console.log('Component will unmount');
    }, []);

    // Démarage du défilement du texte
    const _startTimer = () => {
        if (timerPaused) {
            let index = 0
            setTimerPaused(false)
            setTimer(setInterval(() => {
                // Si on est arrivé à la fin du texte, on boucle
                if(text.length < index + nbLines){
                    index = 0;
                }

                // Sinon, on génère le nouveau vers
                // Pour chaque ligne (dépend de la vitesse)
                let vers = ""
                for (let i = 0; i < nbLines; i++) {
                    // On récupère une partie du texte et on la fait varier avec interpretText
                    vers += "\n" + interpretText(text[index], localityType, speed, saison, weather)
                    index = index + 1
                }
                setVers(vers)
            }, coefTextSpeed * 1000))
        }
    }

    // const _stopTimer = () => {
    //     clearInterval(timer)
    //     setTimerPaused(true)
    // }

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
                <Text style={styles.textCaptors}> Saison : {saison}  </Text>
                <Text style={styles.textCaptors}> Moment : {moment}  </Text>
                <Text style={styles.textCaptors}> Vitesse : {speed}  </Text>
                <Text style={styles.textCaptors}> Latitude : {latitude}  </Text>
                <Text style={styles.textCaptors}> Longitude : {longitude}  </Text>
                <Text style={styles.textCaptors}> Ville : {localityName}  </Text>
                <Text style={styles.textCaptors}> Densité de pop : {localityDensity} </Text>
                <Text style={styles.textCaptors}> Milieu : {localityType}</Text>
                <Text style={styles.textCaptors}> Météo : {weather} </Text>
                <Text style={styles.textCaptors}> Temperature : {temperature}</Text>
            </View>
            }
            <Button title = "Retour" 
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
