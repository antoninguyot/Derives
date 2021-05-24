import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../App.css';
import Button from '../Components/Button';


const ChooseExperiencePage = ({ navigation }) => (
  <View style={[styles.containerWelcomeScreens, { flexDirection: 'column', justifyContent: 'space-around' }]}>
    <Text style={styles.textTitleW}>Choix du mode de l'expérience : </Text>
    <View style={styles.containerRow}>
      <Button navigation={navigation} destination="ChooseMode" icon="camera-outline" text="Mode Lecture" param={{ mode: 'read' }}/>
    </View>
    <View style={styles.containerRow}>
      <Button navigation={navigation} destination="AudioPage" icon="headset-outline" text="Mode écoute" param={{ mode: 'listen' }} />
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
