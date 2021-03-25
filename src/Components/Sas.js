import React, {useEffect, useState} from 'react'
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CCamera from "./CCamera";
import * as Location from "expo-location";
import {calculateMoment} from "../Helpers/time";
import {Image} from "react-native-web";

const Sas = ({navigation}) => {

    const [initialSpeed, setInitialSpeed] = useState(0)
    const [speedAverage, setSpeedAverage] = useState(0)
    const [willTimeTravel, setWillTimeTravel] = useState(false)

    useEffect(() => {
        // Play music

        // Get speed
        Location.getCurrentPositionAsync().then((location) => {
            setInitialSpeed(location.coords.speed)
        })

        // Update location and create an avg speed
        let locationWatcher = Location.watchPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
            distanceInterval: 1
        }, location => {
            setSpeedAverage((speedAverage + location.coords.speed) / 2)
        })

        // Set timeout for n seconds
        let sasTimeout = setTimeout(() => {
            if (speedAverage - initialSpeed > 0) {
                console.log('time travel')
                let newMoment = () => {
                    let moment = calculateMoment()
                    switch (moment) {
                        case 'nuit':
                            return 'matin'
                        case 'matin':
                            return 'midi'
                        case 'midi':
                            return 'soir'
                        case 'soir':
                            return 'nuit'
                    }
                }
                setWillTimeTravel(true)
                console.log('willtimetravel')
                setTimeout(() => {
                    navigation.replace('Texte', {
                        moment: newMoment()
                    })
                }, 2000)
            } else {
                console.log('nope');
                setWillTimeTravel(true)
                setTimeout(() => {
                    navigation.replace('Texte')
                }, 2000)
            }
        }, 5000)
        // If the avg speed was higher than the original, navigate to the next period
        // Else, loop

        return () => {
            clearTimeout(sasTimeout)
            locationWatcher.then(subscriber => {
                subscriber.remove()
            })
        }
    }, []);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.cameraContener}>
                <CCamera/>
                {willTimeTravel &&
                <Image style={{position: 'absolute', marginHorizontal: 'auto', marginVertical: 'auto'}}
                       source={require("../../assets/images/ticking.gif")}></Image>
                }
            </View>
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
    }
});

export default Sas