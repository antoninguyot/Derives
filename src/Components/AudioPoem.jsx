import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as PropTypes from 'prop-types';
import styles from '../../App.css';
import files from '../../assets/audio/manifest';
import { play } from '../Helpers/sound';
import { getTextTitle } from '../Helpers/text';

const AudioPoem = ({
  moment,
  stropheIndex,
  walking,
  isReadyToPlay,
}) => {
  const playFile = async () => {
    const relevantFiles = files[moment][walking ? 'moving' : 'still'];
    const sound = await play(relevantFiles[stropheIndex], 1, false);
    sound.setOnPlaybackStatusUpdate((status) => {
      if (!status.shouldPlay && !status.isPlaying && status.isLoaded) sound.unloadAsync();
    });
  };

  if (isReadyToPlay) playFile();

  const title = getTextTitle(moment);

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
  moment: PropTypes.string.isRequired,
  stropheIndex: PropTypes.number.isRequired,
  walking: PropTypes.bool.isRequired,
  isReadyToPlay: PropTypes.bool.isRequired,
};

export default React.memo(AudioPoem,
  (props, nextProps) => (props.stropheIndex === nextProps.stropheIndex));
