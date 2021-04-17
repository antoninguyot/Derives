import React, {useEffect, useState} from 'react'
import {Animated, View} from 'react-native'
import {calculateMoment} from '../Helpers/time';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setColorBackground, setColorWriting} from '../Helpers/colorInterface';
import {groupStyleSheet} from "../../Appcss";
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
      navigation.navigate('ChooseParams')
    } else {
      const jsonValue = JSON.stringify(new Date)
      await AsyncStorage.setItem('firstConnexionDate', jsonValue)
      navigation.navigate('TextGenerator')
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

  let moment = calculateMoment()

  if (!loaded) {
    return null;
  }

  return (
    <View style={[styles.mainContainer, {backgroundColor: setColorBackground(moment)}]}>
      <Animated.Text
        style={[styles.welcomeText, {fontFamily: 'Antonio', opacity: versOpacity, color: setColorWriting(moment)}]}>
        {welcomeText}
      </Animated.Text>
    </View>
  )
}

const styles = groupStyleSheet.styleAccueil

export default WelcomeScreen
