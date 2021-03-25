/**
 * Calcul de la saison
 */
export const calculateSaison = (mois) => {
    if (mois >= 3 && mois < 6) return "printemps"
    else if (mois >= 6 && mois < 9) return "été"
    else if (mois >= 9 && mois < 12) return "automne"
    else return "hiver"
}

/**
 * Calcul du moment de la journée (en fonction de l'heure et de la saison)
 * À passer sur l'API de la météo
 */
export const calculateMoment = (saison, heure) => {
    switch (saison) {
        case "printemps": {
            if (heure <= 6 && heure > 20) return "nuit" // possible faire un switch ?
            else if (heure > 6 && heure <= 10) return "matin"
            else if (heure > 10 && heure <= 17) return "midi" // réequilibrer les horaires si besoin pour avoir meilleure repartition entre les 4 textes
            else return "soir"
        }

        case "été": {
            if (heure <= 5 && heure > 22) return "nuit"
            else if (heure > 5 && heure <= 10) return "matin"
            else if (heure > 10 && heure <= 18) return "midi"
            else return "soir"
        }

        case "automne": {
            if (heure <= 6 && heure > 20) return "nuit"
            else if (heure > 6 && heure <= 10) return "matin"
            else if (heure > 10 && heure <= 17) return "midi"
            else return "soir"
        }

        case "hiver": {
            if (heure <= 7 && heure > 19) return "nuit"
            else if (heure > 7 && heure <= 10) return "matin"
            else if (heure > 10 && heure <= 17) return "midi"
            else return "soir"
        }

        default: {
            if (heure <= 5 && heure > 21) return "nuit"
            else if (heure > 5 && heure <= 10) return "matin"
            else if (heure > 10 && heure <= 18) return "midi"
            else return "soir"
        }
    }
}
