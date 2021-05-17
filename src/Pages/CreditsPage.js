import {SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import React from 'react';
import {styles} from "../../App.css";
import {Person} from "../Components/Person";
import {useFonts} from "expo-font";
import {Ionicons} from "@expo/vector-icons";

const CreditsPage = ({navigation}) => {

  const [loaded] = useFonts({
    'Antonio': require('../../assets/fonts/Antonio.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.containerCredits}>
      <ScrollView>
        <Text style={[styles.textTitleW, {marginVertical: 15}]}>Crédits</Text>
        <Person image={require('../../assets/images/team/serge.png')}
                name="Serge Bouchardon"
                description="Enseignant chercheur à l'Université de Technologie de Compiègne. Coordination du projet."/>
        <Person image={require('../../assets/images/team/marine.jpg')}
                name="Marine Riguet"
                description="Enseignante chercheuse à l'Université de Troyes. Ecriture des textes"/>
        <Person image={require('../../assets/images/team/herve.jpg')}
                name="Hervé Zenouda"
                description="Enseignant chercheur à l'Université de Toulon. Composition des musiques et création de l'ambiance sonore."/>
        <Person image={require('../../assets/images/team/erika.jpg')}
                name="Erika Fülöp"
                description="Enseignante chercheuse à l'Université de Lancaster. Conseils et suggestions sur le projet"/>
        <Person image={require('../../assets/images/team/charles.jpeg')}
                name="Charles Fiers"
                description="Étudiant à l'UTC. Développement de l'application."/>
        <Person image={require('../../assets/images/team/cecile.jpeg')}
                name="Cécile Asselin"
                description="Étudiante à l'UTC. Développement de l'application."/>
        <Person image={require('../../assets/images/team/bg.jpeg')}
                name="Augustin de Laubier"
                description="Étudiant à l'UTC. Développement de l'application."/>
        <Person image={require('../../assets/images/team/maylis.jpeg')}
                name="Maylis de Talhouet"
                description="Étudiante à l'UTC. Développement de l'application."/>
        <Person image={require('../../assets/images/team/antonin.jpeg')}
                name="Antonin Guyot"
                description="Étudiant à l'UTC. Développement de l'application."/>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('ChooseMode')}>
        <Ionicons name="md-arrow-back-circle-outline" size={32} color="darkgrey"/>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default CreditsPage