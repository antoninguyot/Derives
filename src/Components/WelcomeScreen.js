import React, {useEffect, useState} from 'react'
import {Animated, View} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from "../../App.css";
import TextGenerator from './TextGenerator';
import {fadeTo} from "../Helpers/text";
import {useFonts} from 'expo-font';

const welcomeTexts = [
  "Vous allez vivre une expérience poétique – visuelle et sonore – en marchant.",
  "Selon votre vitesse, mais aussi le moment de la journée, la saison, la température, l'environnement, votre expérience ne sera pas la même..."
]

const WelcomeScreen = ({navigation}) => {

  const [welcomeText, setWelcomeText] = useState("")
  const [versOpacity] = useState(new Animated.Value(0))

  const [loaded] = useFonts({
    'Antonio': require('../../assets/fonts/Antonio.ttf'),
  });

  /**
   * Navigue soit
   * - jusqu'au texte (première expérience)
   * - jusqu'au paramètres sinon
   * @returns {Promise<void>}
   */
  const navigateToNextScreen = async () => {
    const value = await AsyncStorage.getItem('firstConnexionDate')
    if (value != null) {
      navigation.replace('ChooseParams')
    } else {
      const jsonValue = JSON.stringify(new Date)
      await AsyncStorage.setItem('firstConnexionDate', jsonValue)
      navigation.replace('TextGenerator')
    }
  }

  // GetData and tet the text
  useEffect(() => {
    welcomeTexts.forEach((text, index) => {
      // Make each text
      setTimeout(() => {
        versOpacity.setValue(0)
        setWelcomeText(text)
        // Fade in
        fadeTo(versOpacity, 1, 1000)
        setTimeout(() => {
          // And out
          fadeTo(versOpacity, 0, 1000)
        }, 7000)
      }, index * 9000)
    })
    // Then navigate to the next screen
    setTimeout(() => {
      navigateToNextScreen()
    }, welcomeTexts.length * 9000)
  }, [])

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.view}>
      <Animated.Text
        style={[styles.title, {opacity: versOpacity}]}>
        {welcomeText}
      </Animated.Text>
    </View>
  )
}

export default WelcomeScreen
