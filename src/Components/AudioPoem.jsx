import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as PropTypes from 'prop-types';
import { calculateMoment } from '../Helpers/time';
import styles from '../../App.css';
import files from '../../assets/audio/manifest';
import { play } from '../Helpers/sound';

const AudioPoem = ({
  stropheIndex,
  walking,
  isReadyToPlay,
}) => {
  const moment = calculateMoment();

  const playFile = async () => {
    const relevantFiles = files[moment][walking ? 'moving' : 'still'];
    const sound = await play(relevantFiles[stropheIndex], 1);
    sound.setOnPlaybackStatusUpdate((status) => {
      if (!status.shouldPlay && !status.isPlaying && status.isLoaded) sound.unloadAsync();
    });
  };

  if (isReadyToPlay) playFile();

  let title;
  if (moment === 'nuit') {
    title = ['Dérive de la nuit'];
  } else {
    title = [`Dérive du ${moment}`];
  }

  return (
    <>
      <View style={[styles.containerWelcomeScreens, { textAlign: 'center' }]}>
        <Text style={[styles.textTitleW, { marginBottom: 50 }]}>{title}</Text>
        <Ionicons name="headset-outline" size={48} color="white" style={{ textAlign: 'center' }} />
      </View>
    </>
  );
};

AudioPoem.propTypes = {
  stropheIndex: PropTypes.number.isRequired,
  walking: PropTypes.bool.isRequired,
  isReadyToPlay: PropTypes.bool.isRequired,
};

export default React.memo(AudioPoem, (props, nextProps) => (props.stropheIndex === nextProps.stropheIndex));
