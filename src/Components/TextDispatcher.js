import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'

import CCamera from './CCamera'
import WeatherController from "../Helpers/WeatherController";
import LocationController from "../Helpers/LocationController";
import TimeController from "../Helpers/TimeController";
import TextGenerator from "../Helpers/TextGenerator";
import SoundGenerator from "../Helpers/SoundGenerator";

class TextDispatcher extends React.Component {

    _isMounted = false
    timer
    index = 0
    timerPaused = true

    constructor(props) {
        super(props)

        this.state = {
            weather: new WeatherController(this),
            location: new LocationController(this),
            time: new TimeController(this),
            text: new TextGenerator(this),
            sound: new SoundGenerator(this),
            vers: ["Commencez à marcher !"],
            coefPolice: 1,
            coefTextSpeed: 5,
            nbLines: 4,
            debug: false
        }
    }

    componentDidMount() {
        // Séquence de démarrage de la vue texte
        this._isMounted = true;
        // Initialisation des données des sensors
        // this.state.time.initValues()
        // this.state.location.initValues()
        // this.state.weather.initValues()
        // Utilisation des données pour générer les poèmes
        this.state.text._setText()
        this.state.sound.start()

        // Finalement on démarre le défilement du texte
        this._startTimer()
    }

    // Démarage du défilement du texte
    _startTimer() {
        if (this.timerPaused) {
            this.timerPaused = false
            this.timer = setInterval(() => {
                // Si on est arrivé à la fin du texte, on boucle
                if (this.index >= this.state.text.text.length) {
                    this.index = 0
                } else {
                    // Sinon, on génère le nouveau vers
                    this.setState({vers: ""})
                    // Pour chaque ligne (dépend de la vitesse)
                    for (var i = 0; i < this.state.nbLines; i++) {
                        if (this.index < this.state.text.text.length) {
                            // On récupère une partie du texte et on la fait varier avec _interpret
                            this.setState({vers: this.state.vers + "\n" + this.state.text._interpret(this.state.text.text[this.index])})
                            this.index++
                        }
                    }
                }
            }, this.state.coefTextSpeed * 1000)
        }
    }

    _stopTimer() {
        clearInterval(this.timer)
        this.timerPaused = "true"
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.cameraContener}>
                    <CCamera/>
                </View>
                <View style={styles.textContainer}>
                    <TouchableOpacity onLongPress={() => { this.state.debug = ! this.state.debug}}>
                        <Text style={[styles.textOver, {fontSize: 20 * this.state.coefPolice}]}>
                            {this.state.vers}
                        </Text>
                    </TouchableOpacity>
                </View>
                {this.state.debug &&
                <View style={styles.containerCaptors}>
                    <Text style={styles.textCaptors}> Saison : {this.state.time.saison}  </Text>
                    <Text style={styles.textCaptors}> Moment : {this.state.time.moment}  </Text>
                    <Text style={styles.textCaptors}> Vitesse : {this.state.location.speed}  </Text>
                    <Text style={styles.textCaptors}> Latitude : {this.state.location.latitude}  </Text>
                    <Text style={styles.textCaptors}> Longitude : {this.state.location.longitude}  </Text>
                    <Text style={styles.textCaptors}> Ville : {this.state.location.localityName}  </Text>
                    <Text style={styles.textCaptors}> Densité de pop : {this.state.location.localityDensity} </Text>
                    <Text style={styles.textCaptors}> Milieu : {this.state.location.localityType}</Text>
                    <Text style={styles.textCaptors}> Météo : {this.state.weather.heat} </Text>
                    <Text style={styles.textCaptors}> Temperature : {this.state.weather.temperature}</Text>
                </View>
                }
            </View>
        )
    }
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
