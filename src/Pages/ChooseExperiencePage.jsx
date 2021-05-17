import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../App.css';

const ChooseExperiencePage = ({ navigation }) => (
  <View style={[styles.containerWelcomeScreens, { flexDirection: 'column', justifyContent: 'space-around' }]}>
    <Text style={styles.textTitleW}>Choix du sens de l&apos;expérience</Text>
    <View style={styles.containerRow}>
      <View>
        <TouchableOpacity
          style={[styles.buttonStyle, { backgroundColor: 'black', borderWidth: 1, borderColor: 'white' }]}
          onPress={() => {
            navigation.replace('ChooseMode', { mode: 'hybrid' });
          }}
        >
          <Ionicons name="camera-outline" size={48} color="white" style={{ textAlign: 'center' }} />
          <Text style={[styles.textW, { textAlign: 'center' }]}>
            Le texte apparaitra sur votre écran avec une ambiance sonore.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.containerRow}>
      <View>

        <TouchableOpacity
          style={[styles.buttonStyle, { backgroundColor: 'black', borderWidth: 1, borderColor: 'white' }]}
          onPress={() => {
            navigation.replace('ChooseMode', { mode: 'audio' });
          }}
        >
          <Ionicons name="headset-outline" size={48} color="white" style={{ textAlign: 'center' }} />
          <Text style={[styles.textW, { textAlign: 'center' }]}>
            Le texte vous sera dicté à l&apos;oreille avec une ambiance sonore.
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

ChooseExperiencePage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default ChooseExperiencePage;
