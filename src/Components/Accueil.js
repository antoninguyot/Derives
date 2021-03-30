import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import {calculateMoment, calculateSaison} from '../Helpers/time';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setColorBackground, setColorButtonMenu, setColorWriting,setColorWritingButton} from '../Helpers/colorInterface';
import TouchableOpacity from "react-native-gesture-handler/src/components/touchables/TouchableOpacity";

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

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 50,
  },
  buttonGo: {
    paddingTop:20,
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:20,
    textAlign:'center',
    borderRadius: 10,
    borderWidth: 0,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  buttonText: {
    fontSize: 28,
    textAlign: "center",
  }
})

export default Accueil
