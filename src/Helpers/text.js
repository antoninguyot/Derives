import Matin from "../data/Textes/Matin";
import Midi from "../data/Textes/Midi";
import Soir from "../data/Textes/Soir";
import Nuit from "../data/Textes/Nuit";
import WordBase from "../data/Textes/WordBase";

/**
 * Chargement du bon texte en fonction de la période de la journée
 * @private
 */
export const getTextArray = (moment) => {
    switch (moment) {
        case "matin":
            return Matin
        case "midi":
            return Midi
        case "soir":
            return Soir
        case "nuit":
            return Nuit
        default:
            console.log("le temps de la journée ne peut être déterminé")
    }
}

/**
 * Remplacement des balises qui représentent des mots variables dans les textes
 * @param {string} sentence
 * @param localityType
 * @param speed
 * @param saison
 * @param heat
 */
export const interpretText = (sentence, localityType, speed, saison, heat) => {
    let sentence_new = ""
    for (let i = 0; i < sentence.length; i++) {
        if (sentence.charAt(i) === "$") {
            let index = parseInt(sentence.charAt(i + 2) + sentence.charAt(i + 3))
            let varType = sentence.charAt(i + 1);
            let tab = WordBase[varType][index]

            switch (sentence.charAt(i + 4)) {
                case "A":
                    sentence_new += tab[Math.floor((Math.random() * tab.length))]
                    break
                case "G":
                    if (localityType === "rural") sentence_new += tab.rural[Math.floor((Math.random() * tab.rural.length))]
                    if (localityType === "urbain") sentence_new += tab.urbain[Math.floor((Math.random() * tab.urbain.length))]
                    break
                case "V":
                    if (speed < 2) sentence_new += tab.stationary[Math.floor((Math.random() * tab.stationary.length))]
                    else if (speed < 6.4) sentence_new += tab.walking[Math.floor((Math.random() * tab.walking.length))]
                    else if (speed < 8) sentence_new += tab.running[Math.floor((Math.random() * tab.running.length))]
                    else if (speed < 30) sentence_new += tab.cycling[Math.floor((Math.random() * tab.cycling.length))]
                    else  sentence_new += tab.in_vehicle[Math.floor((Math.random() * tab.in_vehicle.length))]
                    break
                case "T":
                    if (heat === "cold") sentence_new += tab.cold[Math.floor((Math.random() * tab.cold.length))]
                    if (heat === "sweet") sentence_new += tab.cold[Math.floor((Math.random() * tab.sweet.length))]
                    if (heat === "hot") sentence_new += tab.cold[Math.floor((Math.random() * tab.hot.length))]
                    break
                case "S":
                    if (saison === "printemps") sentence_new += tab.printemps[Math.floor((Math.random() * tab.printemps.length))]
                    if (saison === "été") sentence_new += tab.été[Math.floor((Math.random() * tab.été.length))]
                    if (saison === "automne") sentence_new += tab.automne[Math.floor((Math.random() * tab.automne.length))]
                    if (saison === "hiver") sentence_new += tab.hiver[Math.floor((Math.random() * tab.hiver.length))]
                    break
                default:
                    sentence_new += "ERROR"
            }
            i += 4
        } else {
            sentence_new += sentence.charAt(i)
        }
    }
    for (let i = 0; i < sentence_new.length; i++) {
        if (sentence_new.charAt(i) === "$") {
            sentence_new = interpretText(sentence_new, localityType, speed, saison, heat) //Permet de faire 2 niveaux d'interprétation
        }
    }
    return sentence_new
}