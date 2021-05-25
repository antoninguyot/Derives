import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Animated, View } from 'react-native';
import styles from '../../App.css';
import { fadeTo } from '../Helpers/anim';

const welcomeTexts = [
  'Vous allez vivre une expérience poétique – visuelle et sonore – en marchant.',
  "Selon votre vitesse, mais aussi le moment de la journée, la saison, la température, l'environnement, votre expérience ne sera pas la même...",
];

const WelcomePage = ({ navigation }) => {
  const [welcomeText, setWelcomeText] = useState('');
  const [versOpacity] = useState(new Animated.Value(0));

  const navigateToNextScreen = async () => {
    navigation.replace('TextGenerator');
  };

  // GetData and tet the text
  useEffect(() => {
    welcomeTexts.forEach((text, index) => {
      // Make each text
      setTimeout(() => {
        versOpacity.setValue(0);
        setWelcomeText(text);
        // Fade in
        fadeTo(versOpacity, 1, 1000);
        setTimeout(() => {
          // And out
          fadeTo(versOpacity, 0, 1000);
        }, 5000);
      }, index * 7000);
    });
    // Then navigate to the next screen
    setTimeout(() => {
      navigateToNextScreen();
    }, welcomeTexts.length * 7000);
  }, []);

  return (
    <View style={styles.containerWelcomeScreens}>
      <Animated.Text
        style={[styles.textTitleW, { opacity: versOpacity }]}
      >
        {welcomeText}
      </Animated.Text>
    </View>
  );
};

WelcomePage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default WelcomePage;
