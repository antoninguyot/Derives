import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'

import CCamera from './CCamera'
import WeatherController from "../Helpers/WeatherController";
import LocationController from "../Helpers/LocationController";
import TimeController from "../Helpers/TimeController";
import {TextGenerator, setTextArray, interpretText} from "../Helpers/TextGenerator";
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


    // equivalent du didMount
    useEffect(() => {

        // Séquence de démarrage de la vue texte
        setIsMounted(true)

        // Initialisation des données des sensors
        LocationController.then((result) => setLocation(result)).catch((err) => console.log(err))
        // WeatherController(location).then((result) => setWeather(result)).catch((err) => console.log(err))
        // TimeController().then((result) => setTime(result)).catch((err) => console.log(err))
        // this.state.time.initValues()
        // this.state.location.initValues()
        // this.state.weather.initValues()

            
        // Utilisation des données pour générer les poèmes
        // TextGenerator.setTextArray(time).then((result) => setText(result)).catch((err) => console.log(err))
        // SoundGenerator.startSound(time).then((result) => setSound(result)).catch((err) => console.log(err))

        // Finalement on démarre le défilement du texte
        // _startTimer()

        // try{
        //     const locationData = await locationRequest()
        //     const weatherInformations = await getWeatherInformations(locationData)
        // }catch(error){
        // }

    }, [isMounted,setIsMounted])

      // Démarage du défilement du texte
      const _startTimer = () => {
        if (timerPaused) {
            timerPaused = false
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
  
      const _stopTimer = () =>  {
          clearInterval(timer)
          setTimerPaused(true)
      }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.cameraContener}>
                <CCamera/>
            </View>
            <View style={styles.textContainer}>
                <TouchableOpacity onLongPress={() => { debug = ! debug}}>
                    <Text style={[styles.textOver, {fontSize: 20 * coefPolice}]}>
                        {vers}
                    </Text>
                </TouchableOpacity>
            </View>
            {debug &&
            <View style={styles.containerCaptors}>
                <Text style={styles.textCaptors}> Saison : {time.saison}  </Text>
                <Text style={styles.textCaptors}> Moment : {time.moment}  </Text>
                <Text style={styles.textCaptors}> Vitesse : {location.speed}  </Text>
                <Text style={styles.textCaptors}> Latitude : {location.latitude}  </Text>
                <Text style={styles.textCaptors}> Longitude : {location.longitude}  </Text>
                <Text style={styles.textCaptors}> Ville : {location.localityName}  </Text>
                <Text style={styles.textCaptors}> Densité de pop : {location.localityDensity} </Text>
                <Text style={styles.textCaptors}> Milieu : {location.localityType}</Text>
                <Text style={styles.textCaptors}> Météo : {weather.heat} </Text>
                <Text style={styles.textCaptors}> Temperature : {weather.temperature}</Text>
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
