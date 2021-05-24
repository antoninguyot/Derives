import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { calculateMoment } from '../Helpers/time';
import styles from '../../App.css';
import files from '../../assets/audio/manifest';
import { play } from '../Helpers/sound';

const AudioPage = ({ navigation }) => {
  const moment = calculateMoment();
  const state = 'moving';
  const [versIndex, setVersIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const relevantFiles = files[moment][state];
      if (relevantFiles.length > versIndex) {
        const sound = await play(relevantFiles[versIndex]);
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) setVersIndex(versIndex + 1);
          if (!status.shouldPlay && !status.isPlaying && status.isLoaded) sound.unloadAsync();
        });
      } else {
        navigation.replace('ChooseModeSense');
      }
    })();
  }, [versIndex]);

  return (
    <View style={[styles.containerWelcomeScreens, { textAlign: 'center' }]}>
      <Ionicons name="headset-outline" size={48} color="white" style={{ textAlign: 'center' }} />
    </View>
  );
};

AudioPage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

export default AudioPage;
