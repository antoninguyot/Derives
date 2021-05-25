import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { calculateMoment } from '../Helpers/time';
import styles from '../../App.css';
import files from '../../assets/audio/manifest';
import { play } from '../Helpers/sound';

const AudioPage = ({ navigation }) => {
  const [text, setText] = useState('');
  const moment = navigation.getParam('moment') || calculateMoment();
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
    setText((moment === 'nuit') ? 'Dérive de la nuit ' : `Dérive du ${moment}`);
  }, [versIndex]);

  return (
    <>
      <View style={[styles.containerWelcomeScreens, { textAlign: 'center' }]}>
        <Text style={[styles.textTitleW, { marginBottom: 50 }]}>{text}</Text>
        <Ionicons name="headset-outline" size={48} color="white" style={{ textAlign: 'center' }} />
      </View>
      <View>
        <TouchableOpacity
          style={{
            flex: 1, position: 'absolute', bottom: 0, left: 0, marginBottom: 5, marginLeft: 5,
          }}
          onPress={() => navigation.replace('ChooseModeSense')}
        >
          <Ionicons name="md-arrow-back-circle-outline" size={32} color="darkgrey" />
        </TouchableOpacity>
      </View>
    </>
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
