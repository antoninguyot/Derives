import {Text, View, StyleSheet, SafeAreaView, ScrollView} from "react-native";
import React,{useEffect,useState} from 'react';
import Constants from 'expo-constants';
import {setColorBackground, setColorWriting} from "../Helpers/colorInterface";
import {calculateMoment, calculateSaison} from "../Helpers/time";

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
    ["Eleonore Sas, Etudiante à l'UTC"],
    ["Marie Leroy, Etudiante à l'UTC"],
]

function displayCredits(){
    let i
    let textCredit = ""
    peopleToCredit.forEach(person => {
        textCredit += person[0] + "\n" + person[1] + "\n" + person[2] + "\n\n"
    })
    return textCredit
}

function displayThanks(){
    let i
    let textCredit = ""
    peopleToCredit.forEach(person => {
        textCredit += person[0] + "\n" + person[1] + "\n" + person[2] + "\n\n"
    })
    return textCredit
}

let jDate = new Date()
let moment = calculateMoment(calculateSaison(jDate.getMonth()), jDate.getHours())

const Credits = ({}) => {

    return(
        <SafeAreaView style={[styles.container, {backgroundColor:setColorBackground(moment)}]}>
            <ScrollView style={styles.scrollView}>
                <Text style={[styles.text,{color:setColorWriting(moment)}]}>
                    {displayCredits()}
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        justifyContent: 'center'
    },
    scrollView: {
        marginHorizontal: 30,
    },
    text: {
        fontSize: 25,
    },
})

export default Credits
