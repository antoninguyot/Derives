import React, { useRef } from 'react';
import { Animated, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fadeLoop } from '../Helpers/anim';
import styles from '../../App.css';

const ForwardIcon = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const fadeInterval = fadeLoop(fadeAnim, 0, 1, 1000);
    return () => {
      clearInterval(fadeInterval);
    };
  }, []);

  return (
    <>
      <View style={[styles.containerWelcomeScreens, { textAlign: 'center' }]}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Ionicons
            name="play-forward-outline"
            size={64}
            color="white"
            style={{ textAlign: 'center' }}
          />
        </Animated.View>
      </View>
    </>
  );
};

export default ForwardIcon;
