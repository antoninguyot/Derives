import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import CCamera from '../Components/CCamera';
import { calculateNextMoment } from '../Helpers/time';
import styles from '../../App.css';
import { fadeLoop } from '../Helpers/anim';

const SasPage = ({ route, navigation }) => {
  const [initialSpeed, setInitialSpeed] = useState(null);
  const [speedAverage, setSpeedAverage] = useState(null);
  const [willTimeTravel, setWillTimeTravel] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  let sasTimeout;

  React.useEffect(() => {
    const fadeInterval = fadeLoop(fadeAnim, 0, 1, 2000);
    return () => {
      clearInterval(fadeInterval);
    };
  }, []);

  useEffect(() => {
    if (willTimeTravel === true) {
      setTimeout(() => {
        navigation.replace('TextGenerator', {
          moment: calculateNextMoment(route.params.momentPlayed),
        });
      }, 2000);
    } else if (willTimeTravel === false) {
      navigation.replace('TextGenerator', { moment: route.params.momentPlayed });
    }
  }, [willTimeTravel]);

  useEffect(() => {
    if (initialSpeed !== null && speedAverage !== null) {
      // Start the countdown
      sasTimeout = setTimeout(() => {
        if (speedAverage - initialSpeed > 0) {
          // If the avg speed was higher than the original, navigate to the next period
          setWillTimeTravel(true);
        } else {
          // Else, loop
          setWillTimeTravel(false);
        }
      }, 15000);
    }
  }, [initialSpeed, speedAverage]);

  useEffect(() => {
    // Play music

    // Get speed
    Location.getCurrentPositionAsync().then((location) => {
      setInitialSpeed(location.coords.speed);
    });

    // Update location and create an avg speed
    const locationWatcher = Location.watchPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation,
      distanceInterval: 1,
    }, (location) => {
      setSpeedAverage((speedAverage + location.coords.speed) / 2);
    });

    return () => {
      clearTimeout(sasTimeout);
      locationWatcher.then((subscriber) => {
        subscriber.remove();
      });
    };
  }, []);

  return (
    <View style={styles.containerCamera}>
      <View style={styles.containerCamera}>
        <CCamera />
        {willTimeTravel
        && (
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
          opacity: fadeAnim,
        }}
        >
          <Ionicons name="md-play-skip-forward" size={64} color="white" />
          <Ionicons name="md-play-skip-forward" size={64} color="white" />
        </Animated.View>
        )
        || (
        <Animated.View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          marginTop: 50,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: fadeAnim,
        }}
        >
          <Text>
            Accélérez pour passer à :
            {calculateNextMoment(route.params.momentPlayed)}
          </Text>
        </Animated.View>
        )}
      </View>
    </View>
  );
};

SasPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.object.isRequired,
};

export default SasPage;
