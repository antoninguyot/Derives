import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Animated, View } from 'react-native';
import i18n from 'i18n-js';
import styles from '../../App.css';
import { fadeTo } from '../Helpers/anim';

const WelcomePage = ({ navigation }) => {
  const [welcomeText, setWelcomeText] = useState('');
  const [versOpacity] = useState(new Animated.Value(0));

  const navigateToNextScreen = async () => {
    navigation.replace('Poem');
  };

  // GetData and tet the text
  useEffect(() => {
    const welcomeTexts = i18n.t('welcome.texts');
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
