import React, {useEffect, useState} from 'react'
import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CCamera from "./CCamera";
import * as Location from "expo-location";
import {calculateMoment} from "../Helpers/time";

const Sas = ({navigation}) => {

    const [initialSpeed, setInitialSpeed] = useState(0)
    const [speedAverage, setSpeedAverage] = useState(0)
    const [speedDifference, setSpeedDifference] = useState(0)

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
                navigation.replace('Texte', {
                    moment: newMoment()
                })
            } else {
                navigation.replace('Texte')
            }
        }, 10000)
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