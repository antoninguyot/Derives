import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import {calculateMoment, calculateSaison} from '../Helpers/time';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setColorBackground, setColorWriting} from '../Helpers/colorInterface';
import TouchableOpacity from "react-native-gesture-handler/src/components/touchables/TouchableOpacity";
import {groupStyleSheet} from "../../Appcss";

const description = "Vous allez vivre une expérience poétique – visuelle et sonore – en marchant.\nSelon votre vitesse, mais aussi le moment de la journée, la saison, la température, l'environnement, votre expérience ne sera pas la même..."

const Accueil = ({navigation}) => {

  const [firstConnexion, setFirstConnexion] = useState()
  /**
   * Mise à jour du temps de la journée
   */

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('firstConnexionDate')
      if(value !== null) {
        setFirstConnexion(false)
      } else {
        setFirstConnexion(true)
        const jsonValue = JSON.stringify(new Date)
        await AsyncStorage.setItem('firstConnexionDate', jsonValue)
      }
    } catch(e) {
      console.log("erreur", e)
    }
  }

  useEffect( () => {
    getData()
  }, [])

  let moment = calculateMoment()

  return (
      <View style={[styles.mainContainer, {backgroundColor: setColorBackground(moment)}]}>
        <Text style={[styles.welcomeText, {color:setColorWriting(moment)}]}>
          {description}
        </Text>
        {firstConnexion && (
            <TouchableOpacity
                style={[styles.buttonGo,{backgroundColor:setColorWriting(moment)}]}
                onPress={() => navigation.navigate('Texte')}>
              <Text style={[styles.buttonText, {color:setColorBackground(moment)}]}>GO</Text>
            </TouchableOpacity>
        )}
        {!firstConnexion && (
            <TouchableOpacity
                style={[styles.buttonGo,{backgroundColor:setColorWriting(moment)}]}
                onPress={() => navigation.navigate('Texte')}>
              <Text style={[styles.buttonText, {color:setColorBackground(moment)}]}>GO</Text>
            </TouchableOpacity>
        )}
      </View>
  )
}

const styles = groupStyleSheet.styleAccueil

export default Accueil
