import Matin from "../Texts/Matin";
import Midi from "../Texts/Midi";
import Soir from "../Texts/Soir";
import Nuit from "../Texts/Nuit";
import WordBase from "../Texts/WordBase";

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
 * @param {string} location
 * @param {string} weather
 */
export const combine = (sentence, location, weather) => {
  // On repère les sections entre brackets {}
  let toCombine = sentence.match(/{([^}]+)}/g);

  // Si il n'y en a aucune, pas besoin d'interpréter
  if (toCombine === null) {
    return sentence;
  }

  toCombine.forEach(rawString => {
    let combinationString = rawString.replace('{', '').replace('}', '')
    // Type de combinatoire (aléatoire, GPS, localisation...)
    let selectionType = combinationString.substring(0, combinationString.indexOf("|"))
    // Choix des mots possibles
    let selectionChoices = {};
    combinationString
      .substring(combinationString.indexOf("|") + 1)
      .split(',')
      .forEach(choice => {
        // Si le choix nécessite des arguments (ex. ville ou campagne pour le GPS)
        if (choice.indexOf(':') !== -1) {
          // On retourne un dictionnaire avec ces arguments en clé
          selectionChoices[choice.substring(0, choice.indexOf(":"))] = choice.substring(choice.indexOf(":") + 1)
        } else {
          // Sinon on retourne des index numériques
          selectionChoices[Object.keys(selectionChoices).length] = choice
        }
      })
    // On remplace la partie entre {} par le résultat pour chaque type de combinatoire
    sentence = sentence.replace(rawString, () => {
      switch (selectionType) {
        case 'random':
          return selectionChoices[Math.floor((Math.random() * Object.keys(selectionChoices).length))]
        case 'location':
          return selectionChoices[location]
        case 'weather':
          return selectionChoices[weather]
        default:
          return selectionChoices[0];
      }
    })
  })

  return sentence
}

/**
 * Remplacement des balises qui représentent des mots variables dans les textes
 * @param {string} sentence
 * @param localityType
 * @param speed
 * @param season
 * @param heat
 */
export const interpretText = (sentence, localityType, activity, season, heat, speedIncreased) => {
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
          sentence_new += tab[season][Math.floor((Math.random() * tab[season].length))]
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
      sentence_new = interpretText(sentence_new, localityType, activity, season, heat, speedIncreased) //Permet de faire 2 niveaux d'interprétation
    }
  }
  return sentence_new
}
