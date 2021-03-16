import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'


const description = "Vous allez vivre une expérience poétique – visuelle et sonore – en marchant.\nSelon votre vitesse, mais aussi le moment de la journée, la saison, la température, l'environnement, votre expérience ne sera pas la même..."

const Accueil = ({navigation}) => {

  return(
    <View style={styles.mainContainer}>
      <Text style={styles.welcomeText}>
        {description}
      </Text>
      <Button style={styles.buttonGo} title='GO' onPress={() => navigation.navigate('Menu')}/>
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
    width: 50,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFE7EE'
  }
})

export default Accueil