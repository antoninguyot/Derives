import React, {useEffect, useState} from 'react'
import {Animated, Text, View} from 'react-native'
import {calculateMoment} from '../Helpers/time';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setColorBackground, setColorWriting} from '../Helpers/colorInterface';
import TouchableOpacity from "react-native-gesture-handler/src/components/touchables/TouchableOpacity";
import {groupStyleSheet} from "../../Appcss";
import TextGenerator from './TextGenerator';
import {fadeTo} from "../Helpers/text";

const description = ["Vous allez vivre une expérience poétique – visuelle et sonore – en marchant.",
                     "Selon votre vitesse, mais aussi le moment de la journée, la season, la température," + " l'environnement, votre expérience ne sera pas la même..."]

const WelcomeScreen = ({navigation}) => {

  const [destinationScreen, setDestinationScreen] = useState()
  const [welcomeText, setWelcomeText] = useState("")
  const [versOpacity] = useState(new Animated.Value(0))
  /**
   * Mise à jour du temps de la journée
   */
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('firstConnexionDate')
      if (value !== null) {
        setDestinationScreen('ChooseParams')
      } else {
        setDestinationScreen('TextGenerator')
        const jsonValue = JSON.stringify(new Date)
        await AsyncStorage.setItem('firstConnexionDate', jsonValue)
      }
    } catch (e) {
      console.log("erreur", e)
    }
  }
  // Function which permit to change screen
  function moveTo(){
    navigation.navigate('TextGenerator')
  }
  // Change opacity of text when it appears
  useEffect(() => {
    versOpacity.setValue(0)
    fadeTo(versOpacity, 1)
  }, [welcomeText])
  // GetData and tet the text
  useEffect(() => {
    getData()
    setWelcomeText(description[0])
    setTimeout(() => {
      setWelcomeText(description[1])
      setTimeout(() => {
        moveTo()
      }, 5000)
    }, 10000)
  }, [])

  let moment = calculateMoment()

  return (
    <View style={[styles.mainContainer, {backgroundColor: setColorBackground(moment)}]}>
      <Animated.Text style={[styles.welcomeText, {opacity: versOpacity, color:setColorWriting(moment)}]}>
        {welcomeText}
      </Animated.Text>
    </View>
  )
}

const styles = groupStyleSheet.styleAccueil

export default WelcomeScreen
