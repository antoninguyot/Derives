import React, {useEffect, useState, useRef} from 'react'
import {Animated, Text, View} from "react-native";
import CCamera from "./CCamera";
import * as Location from "expo-location";
import {calculateNextMoment} from "../Helpers/time";
import {Ionicons} from '@expo/vector-icons';
import {groupStyleSheet} from "../../Appcss";

const Sas = ({navigation}) => {

    const [initialSpeed, setInitialSpeed] = useState(null)
    const [speedAverage, setSpeedAverage] = useState(null)
    const [willTimeTravel, setWillTimeTravel] = useState(null)

    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
    let sasTimeout;

    React.useEffect(() => {
        Animated.loop(Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }
        )).start();
    }, [fadeAnim])

    useEffect(() => {
        if (willTimeTravel === true) {
            setTimeout(() => {
                navigation.replace('Texte', {
                    moment: calculateNextMoment()
                })
            }, 2000)
        } else if (willTimeTravel === false) {
            navigation.replace('Texte')
        }
    }, [willTimeTravel])

    useEffect(() => {
        if(initialSpeed !== null && speedAverage !== null){
            // Start the countdown
            sasTimeout = setTimeout(() => {
                if (speedAverage - initialSpeed > 0) {
                    // If the avg speed was higher than the original, navigate to the next period
                    setWillTimeTravel(true)
                } else {
                    // Else, loop
                    setWillTimeTravel(false)
                }
            }, 15000)
        }
    }, [initialSpeed, speedAverage])

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
                <Animated.View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 70,
                    flexDirection: 'row',
                    opacity: fadeAnim
                }}>
                    <Ionicons name="md-play-skip-forward" size={64} color="white"/>
                    <Ionicons name="md-play-skip-forward" size={64} color="white"/>
                </Animated.View>
                ||
                <Animated.View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    marginTop: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: fadeAnim
                }}>
                    <Text>Accélérez pour passer à : {calculateNextMoment()}</Text>
                </Animated.View>
                }
            </View>
        </View>
    )
}

const styles = groupStyleSheet.styleSas

export default Sas
