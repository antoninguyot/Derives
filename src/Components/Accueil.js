import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import {calculateMoment} from '../Helpers/time';


const description = "Vous allez vivre une expérience poétique – visuelle et sonore – en marchant.\nSelon votre vitesse, mais aussi le moment de la journée, la saison, la température, l'environnement, votre expérience ne sera pas la même..."

const Accueil = ({navigation}) => {
  let moment = calculateMoment()
  switch (moment){
    case "matin" :
      return(
          <View style={styles.mainContainerMatin}>
            <Text style={styles.welcomeTextMatin}>
              {description}
            </Text>
            <Button color='#999' style={styles.buttonGoMatin} title='GO' onPress={() => navigation.navigate('Menu')}/>
          </View>
      )
    case "midi" :
      return(
          <View style={styles.mainContainerMidi}>
            <Text style={styles.welcomeTextMidi}>
              {description}
            </Text>
            <Button color='#ccc' style={styles.buttonGoMidi} title='GO' onPress={() => navigation.navigate('Menu')}/>
          </View>
      )
    case "soir" :
      return(
          <View style={styles.mainContainerSoir}>
            <Text style={styles.welcomeTextSoir}>
              {description}
            </Text>
            <Button color='#000' style={styles.buttonGoSoir} title='GO' onPress={() => navigation.navigate('Menu')}/>
          </View>
      )
    case "nuit" :
      return(
          <View style={styles.mainContainerNuit}>
            <Text style={styles.welcomeTextNuit}>
              {description}
            </Text>
            <Button color='#000' style={styles.buttonGoNuit} title='GO' onPress={() => navigation.navigate('Menu')}/>
          </View>
      )
  }
}


const styles = StyleSheet.create({
  welcomeTextMatin: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 50,
    color: '#999',
  },
  buttonGoMatin: {
    width: 50,
  },
  mainContainerMatin: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFE782'
  },
  welcomeTextMidi: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 50,
    color:"#FFFFFF"
  },
  buttonGoMidi: {
    width: 50,
  },
  mainContainerMidi: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#87CEEB'
  },
  welcomeTextSoir: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 50,
    color:'#000000'
  },
  buttonGoSoir: {
    width: 50,
  },
  mainContainerSoir: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FF8C00'
  },
  welcomeTextNuit: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 50,
    color: '#FFFFFF'
  },
  buttonGoNuit: {
    width: 50,
  },
  mainContainerNuit: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#0F056B'
  }
})

export default Accueil
