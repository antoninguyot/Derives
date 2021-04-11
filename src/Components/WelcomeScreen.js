import React, {useEffect, useState} from 'react'
import {Text, View} from 'react-native'
import {calculateMoment} from '../Helpers/time';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setColorBackground, setColorWriting} from '../Helpers/colorInterface';
import TouchableOpacity from "react-native-gesture-handler/src/components/touchables/TouchableOpacity";
import {groupStyleSheet} from "../../Appcss";
import TextGenerator from './TextGenerator';

const description = "Vous allez vivre une expérience poétique – visuelle et sonore – en marchant.\nSelon votre vitesse, mais aussi le moment de la journée, la season, la température, l'environnement, votre expérience ne sera pas la même..."

const WelcomeScreen = ({navigation}) => {

  const [destinationScreen, setDestinationScreen] = useState()
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

  useEffect(() => {
    getData()
  }, [])

  let moment = calculateMoment()

  return (
    <View style={[styles.mainContainer, {backgroundColor: setColorBackground(moment)}]}>
      <Text style={[styles.welcomeText, {color: setColorWriting(moment)}]}>
        {description}
      </Text>
      <TouchableOpacity
        style={[styles.buttonGo, {backgroundColor: setColorWriting(moment)}]}
        onPress={() => navigation.navigate(destinationScreen)}>
        <Text style={[styles.buttonText, {color: setColorBackground(moment)}]}>GO</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = groupStyleSheet.styleAccueil

export default WelcomeScreen
