import React, { useRef } from 'react';
import { Animated, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fadeLoop } from '../Helpers/anim';

const ForwardIcon = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const fadeInterval = fadeLoop(fadeAnim, 0, 1, 2000);
    return () => {
      clearInterval(fadeInterval);
    };
  }, []);

  return (
    <View style={{ backgroundColor: 'black' }}>
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
        <Ionicons name="md-play-forward-outline" size={64} color="white" />
      </Animated.View>
    </View>
  );
};

export default ForwardIcon;
