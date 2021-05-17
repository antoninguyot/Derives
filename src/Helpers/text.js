import Matin from "../../assets/texts/morning.json";
import Midi from "../../assets/texts/afternoon.json";
import Soir from "../../assets/texts/evening.json";
import {Animated} from "react-native";

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
      return Soir
    default:
      return undefined
  }
}

/**
 * Remplacement des balises qui représentent des mots variables dans les textes
 * @param {string} sentence
 * @param {string} location
 * @param {string} weather
 * @param {string} season
 */
export const combine = (sentence, location, weather, season) => {
  // On repère les sections entre brackets {}
  let toCombine = sentence.match(/{([^}]+)}/g);

  // Si il n'y en a aucune, pas besoin d'interpréter
  if (toCombine === null) {
    return sentence;
  }

  toCombine.forEach(rawString => {
    let combinationString = rawString.replace('{', '').replace('}', '')
    if (combinationString.startsWith('$')) {
      // Si notre combinatoire est simplement une variable
      sentence = sentence.replace(rawString, evalVar(combinationString));
    } else {
      // Si c'est un combinatoire complexe
      sentence = sentence.replace(rawString, evalCombi(combinationString, location, weather, season));
    }
  })
  return sentence
}

const evalCombi = (combinationString, location, weather, season) => {
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
  return () => {
    switch (selectionType) {
      case 'random':
        return selectionChoices[Math.floor((Math.random() * Object.keys(selectionChoices).length))]
      case 'location':
        return selectionChoices[location]
      case 'weather':
        return selectionChoices[weather]
      case 'season':
        return selectionChoices[season]
      default:
        return selectionChoices[0]
    }
  }
}

const evalVar = (combinationString) => {
  let varName = combinationString.substring(1);
  return () => {
    switch (varName) {
      case 'month':
        let monthLocalized = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        let date = new Date();
        return monthLocalized[date.getMonth()];
    }
  }
}

export const fadeTo = (value, to, during = 1000, native = true) => {
  Animated.timing(value, {
    toValue: to,
    duration: during,
    useNativeDriver: native
  }).start()
}
