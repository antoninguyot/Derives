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
            return undefined
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
export const interpretText = (sentence, localityType, activity, saison, heat) => {
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
                    sentence_new += tab[localityType][Math.floor((Math.random() * tab[localityType].length))]
                    break
                case "V":
                    sentence_new += tab[activity][Math.floor(Math.random() * tab[activity].length)]
                    break
                case "T":
                    sentence_new += tab[heat][Math.floor((Math.random() * tab[heat].length))]
                    break
                case "S":
                    sentence_new += tab[saison][Math.floor((Math.random() * tab[saison].length))]
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
            sentence_new = interpretText(sentence_new, localityType, activity, saison, heat) //Permet de faire 2 niveaux d'interprétation
        }
    }
    return sentence_new
}
