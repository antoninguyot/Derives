import {Image, SafeAreaView, ScrollView, Text, TouchableOpacity} from "react-native";
import React from 'react';
import {setColorBackground, setColorWriting} from "../Helpers/colorInterface";
import {calculateMoment, calculateSeason} from "../Helpers/time";
import {groupStyleSheet} from "../../Appcss";

const photos = [
  '../data/Photo/cecile.jpeg',
  '../data/Photo/Photo_hervé.jpg',
  '../data/Photo/marine.jpg',
  '../data/Photo/serge.png',
  '../data/Photo/charles.jpeg',
  '../data/Photo/antonin.jpeg',
  '../data/Photo/maylis.jpeg',
  '../data/Photo/bg.jpeg',
  '../data/Photo/erika.jpg',
]


const peopleToCredit = [
  ["Serge Bouchardon", "Professeur Chercheur de l'UTC", "Coordination du projet"],
  ["Marine Riguet", "Professeure Chercheuse", "Ecriture des textes"],
  ["Hervé Zenouda", "Professeur Chercheur", "Composition des musiques"],
  ["Erika Fulops", "Professeure Chercheuse", "Conseil et Suggestion sur le projet"],
  ["Charles Fiers", "Etudiant à l'UTC", "Developpement de l'application"],
  ["Cécile Asselin", "Etudiante à l'UTC", "Developpement de l'application"],
  ["Antonin Guyot", "Etudiant à l'UTC", "Developpement de l'application"],
  ["Maylis de Talhouet", "Etudiante à l'UTC", "Developpement de l'application"],
  ["Augustin de Laubier", "Etudiant à l'UTC", "Developpement de l'application"]
]
const peopleToThank = [
  ["Eleonore Sas,", "Etudiante à l'UTC"],
  ["Marie Leroy", "Etudiante à l'UTC"],
]

function displayCredits() {
  let i
  let textCredit = ""
  peopleToCredit.forEach(person => {
    textCredit += "\n" + person[1] + "\n" + person[2] + "\n" + person[3] + "\n\n"
  })
  return textCredit
}

function displayThanks() {
  let i
  let textThank = ""
  peopleToThank.forEach(person => {
    textThank += person[0] + "\n" + person[1] + "\n\n"
  })
  return textThank
}

let jDate = new Date()
let moment = calculateMoment(calculateSeason(jDate.getMonth()), jDate.getHours())

const Credits = ({navigation}) => {

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: setColorBackground(moment), marginTop: 30}]}>
      <ScrollView style={styles.scrollView}>
        <Text style={[styles.textTitle, {color: setColorWriting(moment)}]}>{"\nCrédits\n"}</Text>
        <Image style={styles.photo} source={require('../../assets/images/team/serge.png')}/>
        <Text
          style={[styles.text, {color: setColorWriting(moment)}]}> {peopleToCredit[0][0] + "\n" + peopleToCredit[0][1] + "\n" + peopleToCredit[0][2] + "\n"} </Text>
        <Image style={styles.photo} source={require('../../assets/images/team/marine.jpg')}/>
        <Text
          style={[styles.text, {color: setColorWriting(moment)}]}> {peopleToCredit[1][0] + "\n" + peopleToCredit[1][1] + "\n" + peopleToCredit[1][2] + "\n"} </Text>
        <Image style={styles.photo} source={require('../../assets/images/team/herve.jpg')}/>
        <Text
          style={[styles.text, {color: setColorWriting(moment)}]}> {peopleToCredit[2][0] + "\n" + peopleToCredit[2][1] + "\n" + peopleToCredit[2][2] + "\n"} </Text>
        <Image style={styles.photo} source={require('../../assets/images/team/erika.jpg')}/>
        <Text
          style={[styles.text, {color: setColorWriting(moment)}]}> {peopleToCredit[3][0] + "\n" + peopleToCredit[3][1] + "\n" + peopleToCredit[3][2] + "\n"} </Text>
        <Image style={styles.photo} source={require('../../assets/images/team/charles.jpeg')}/>
        <Text
          style={[styles.text, {color: setColorWriting(moment)}]}> {peopleToCredit[4][0] + "\n" + peopleToCredit[4][1] + "\n" + peopleToCredit[4][2] + "\n"} </Text>
        <Image style={styles.photo} source={require('../../assets/images/team/cecile.jpeg')}/>
        <Text
          style={[styles.text, {color: setColorWriting(moment)}]}> {peopleToCredit[5][0] + "\n" + peopleToCredit[5][1] + "\n" + peopleToCredit[5][2] + "\n"} </Text>
        <Image style={styles.photo} source={require('../../assets/images/team/antonin.jpeg')}/>
        <Text
          style={[styles.text, {color: setColorWriting(moment)}]}> {peopleToCredit[6][0] + "\n" + peopleToCredit[6][1] + "\n" + peopleToCredit[6][2] + "\n"} </Text>
        <Image style={styles.photo} source={require('../../assets/images/team/maylis.jpeg')}/>
        <Text
          style={[styles.text, {color: setColorWriting(moment)}]}> {peopleToCredit[7][0] + "\n" + peopleToCredit[7][1] + "\n" + peopleToCredit[7][2] + "\n"} </Text>
        <Image style={styles.photo} source={require('../../assets/images/team/bg.jpeg')}/>
        <Text
          style={[styles.text, {color: setColorWriting(moment)}]}> {peopleToCredit[8][0] + "\n" + peopleToCredit[8][1] + "\n" + peopleToCredit[8][2] + "\n"} </Text>
        <Text style={[styles.textTitle, {color: setColorWriting(moment)}]}>{"\nRemerciements\n"}</Text>
        <Text style={[styles.text, {color: setColorWriting(moment)}]}>{displayThanks()}</Text>

      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('ChooseParams')}
        style={[styles.retourMenu, {backgroundColor: setColorWriting(moment)}]}>
        <Text style={[styles.text, {color: setColorBackground(moment)}]}>Retour au Menu</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = groupStyleSheet.styleCredits

export default Credits
