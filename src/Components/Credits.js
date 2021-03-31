import {Text, View, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity} from "react-native";
import React,{useEffect,useState} from 'react';
import Constants from 'expo-constants';
import {setColorBackground, setColorWriting} from "../Helpers/colorInterface";
import {calculateMoment, calculateSaison} from "../Helpers/time";
import {groupStyleSheet} from "../../Appcss";

const photos = [
    '../data/Photo/Photo_Cecile.jpeg',
    '../data/Photo/Photo_hervé.jpg',
    '../data/Photo/Photo_Marine.jpg',
    '../data/Photo/Photo_Serge.png',
    '../data/Photo/Photo_Charles.jpeg',
    '../data/Photo/Photo_Antonin.jpeg',
    '../data/Photo/Photo_Maylis.jpeg',
    '../data/Photo/Photo_bg.jpeg',
    '../data/Photo/Photo_Erika.jpg',
]


const peopleToCredit = [
    ["Serge Bouchardon", "Professeur Chercheur de l'UTC", "Coordination du projet"],
    ["Marine Riguet", "Professeure Chercheuse", "Ecriture des textes"],
    ["Hervé Zenouda","Professeur Chercheur", "Composition des musiques"],
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

function displayCredits(){
    let i
    let textCredit = ""
    peopleToCredit.forEach(person => {
        textCredit += "\n" + person[1] + "\n" + person[2] + "\n" + person[3] + "\n\n"
    })
    return textCredit
}

function displayThanks(){
    let i
    let textThank = ""
    peopleToThank.forEach(person => {
        textThank += person[0] + "\n" + person[1] + "\n\n"
    })
    return textThank
}

let jDate = new Date()
let moment = calculateMoment(calculateSaison(jDate.getMonth()), jDate.getHours())

const Credits = ({navigation}) => {

    return(
        <SafeAreaView style={[styles.container, {backgroundColor:setColorBackground(moment), marginTop:30}]}>
            <ScrollView style={styles.scrollView}>
                <Text style={[styles.textTitle,{color:setColorWriting(moment)}]}>{"\nCrédits\n"}</Text>
                <Image style={styles.photo} source={require('../data/Photo/Photo_Serge.png')}/>
                <Text style={[styles.text,{color:setColorWriting(moment)}]}> {peopleToCredit[0][0] + "\n" +peopleToCredit[0][1] + "\n" +peopleToCredit[0][2] + "\n"} </Text>
                <Image style={styles.photo} source={require('../data/Photo/Photo_Marine.jpg')}/>
                <Text style={[styles.text,{color:setColorWriting(moment)}]}> {peopleToCredit[1][0] + "\n" +peopleToCredit[1][1] + "\n" +peopleToCredit[1][2] + "\n"} </Text>
                <Image style={styles.photo} source={require('../data/Photo/Photo_herve.jpg')}/>
                <Text style={[styles.text,{color:setColorWriting(moment)}]}> {peopleToCredit[2][0] + "\n" +peopleToCredit[2][1] + "\n" +peopleToCredit[2][2] + "\n"} </Text>
                <Image style={styles.photo} source={require('../data/Photo/Photo_Erika.jpg')}/>
                <Text style={[styles.text,{color:setColorWriting(moment)}]}> {peopleToCredit[3][0] + "\n" +peopleToCredit[3][1] + "\n" +peopleToCredit[3][2] + "\n"} </Text>
                <Image style={styles.photo} source={require('../data/Photo/Photo_Charles.jpeg')}/>
                <Text style={[styles.text,{color:setColorWriting(moment)}]}> {peopleToCredit[4][0] + "\n" +peopleToCredit[4][1] + "\n" +peopleToCredit[4][2] + "\n"} </Text>
                <Image style={styles.photo} source={require('../data/Photo/Photo_Cecile.jpeg')}/>
                <Text style={[styles.text,{color:setColorWriting(moment)}]}> {peopleToCredit[5][0] + "\n" +peopleToCredit[5][1] + "\n" +peopleToCredit[5][2] + "\n"} </Text>
                <Image style={styles.photo} source={require('../data/Photo/Photo_Antonin.jpeg')}/>
                <Text style={[styles.text,{color:setColorWriting(moment)}]}> {peopleToCredit[6][0] + "\n" +peopleToCredit[6][1] + "\n" +peopleToCredit[6][2] + "\n"} </Text>
                <Image style={styles.photo} source={require('../data/Photo/Photo_Maylis.jpeg')}/>
                <Text style={[styles.text,{color:setColorWriting(moment)}]}> {peopleToCredit[7][0] + "\n" +peopleToCredit[7][1] + "\n" +peopleToCredit[7][2] + "\n"} </Text>
                <Image style={styles.photo} source={require('../data/Photo/Photo_bg.jpeg')}/>
                <Text style={[styles.text,{color:setColorWriting(moment)}]}> {peopleToCredit[8][0] + "\n" +peopleToCredit[8][1] + "\n" +peopleToCredit[8][2] + "\n"} </Text>
                <Text style={[styles.textTitle,{color:setColorWriting(moment)}]}>{"\nRemerciements\n"}</Text>
                <Text style={[styles.text,{color:setColorWriting(moment)}]}>{displayThanks()}</Text>

            </ScrollView>
            <TouchableOpacity
                onPress={() => navigation.navigate('Menu')}
                style={[styles.retourMenu,{backgroundColor:setColorWriting(moment)}]}>
                <Text style = {[styles.text, {color:setColorBackground(moment)}]}>Retour au Menu</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = groupStyleSheet.styleCredits

export default Credits
