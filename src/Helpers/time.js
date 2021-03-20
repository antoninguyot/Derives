/**
 * Calcul de la saison
 */
export const calculateSaison = () => {
    let month = (new Date()).getMonth()
    if (month >= 3 && month < 6) return "printemps"
    else if (month >= 6 && month < 9) return "été"
    else if (month >= 9 && month < 12) return "automne"
    else return "hiver"
}

/**
 * Calcul du moment de la journée (en fonction de l'heure et de la saison)
 * À passer sur l'API de la météo
 */
export const calculateMoment = () => {
    let hour = (new Date()).getHours()
    let saison = calculateSaison()
    switch (saison) {
        case "printemps": {
            if (hour <= 6 && hour > 20) return "nuit" // possible faire un switch ?
            else if (hour > 6 && hour <= 10) return "matin"
            else if (hour > 10 && hour <= 17) return "midi" // réequilibrer les horaires si besoin pour avoir meilleure repartition entre les 4 textes
            else return "soir"
        }

        case "été": {
            if (hour <= 5 && hour > 22) return "nuit"
            else if (hour > 5 && hour <= 10) return "matin"
            else if (hour > 10 && hour <= 18) return "midi"
            else return "soir"
        }

        case "automne": {
            if (hour <= 6 && hour > 20) return "nuit"
            else if (hour > 6 && hour <= 10) return "matin"
            else if (hour > 10 && hour <= 17) return "midi"
            else return "soir"
        }

        case "hiver": {
            if (hour <= 7 && hour > 19) return "nuit"
            else if (hour > 7 && hour <= 10) return "matin"
            else if (hour > 10 && hour <= 17) return "midi"
            else return "soir"
        }

        default: {
            if (hour <= 5 && hour > 21) return "nuit"
            else if (hour > 5 && hour <= 10) return "matin"
            else if (hour > 10 && hour <= 18) return "midi"
            else return "soir"
        }
    }
}
