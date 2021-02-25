class TimeController {

    date = new Date();
    mois = this.date.getMonth() - 1;
    heure = this.date.getHours();
    formattedDate = null;
    saison = null;
    moment = null;

    constructor(dispatcher) {
        this.dispatcher = dispatcher
        this.initValues()
    }

    initValues() {
        this.formattedDate = this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getDate()
        this.calculateSaison()
        this.calculateMoment()
    }

    /**
     * Calcul de la saison
     */
    calculateSaison() {
        if (this.mois >= 3 && this.mois < 6) this.saison = "printemps"
        else if (this.mois >= 6 && this.mois < 9) this.saison = "été"
        else if (this.mois >= 9 && this.mois < 12) this.saison = "automne"
        else this.saison = "hiver"
    }

    /**
     * Calcul du moment de la journée (en fonction de l'heure et de la saison)
     * À passer sur l'API de la météo
     */
    calculateMoment() {
        switch (this.saison) {
            case "printemps": {
                if (this.heure <= 6 && this.heure > 20) this.moment = "nuit" // possible faire un switch ?
                else if (this.heure > 6 && this.heure <= 10) this.moment = "matin"
                else if (this.heure > 10 && this.heure <= 17) this.moment = "midi" // réequilibrer les horaires si besoin pour avoir meilleure repartition entre les 4 textes
                else this.moment = "soir"
                break
            }

            case "été": {
                if (this.heure <= 5 && this.heure > 22) this.moment = "nuit"
                else if (this.heure > 5 && this.heure <= 10) this.moment = "matin"
                else if (this.heure > 10 && this.heure <= 18) this.moment = "midi"
                else this.moment = "soir"
                break
            }

            case "automne": {
                if (this.heure <= 6 && this.heure > 20) this.moment = "nuit"
                else if (this.heure > 6 && this.heure <= 10) this.moment = "matin"
                else if (this.heure > 10 && this.heure <= 17) this.moment = "midi"
                else this.moment = "soir"
                break
            }

            case "hiver": {
                if (this.heure <= 7 && this.heure > 19) this.moment = "nuit"
                else if (this.heure > 7 && this.heure <= 10) this.moment = "matin"
                else if (this.heure > 10 && this.heure <= 17) this.moment = "midi"
                else this.moment = "soir"
                break
            }

            default: {
                if (this.heure <= 5 && this.heure > 21) this.moment = "nuit"
                else if (this.heure > 5 && this.heure <= 10) this.moment = "matin"
                else if (this.heure > 10 && this.heure <= 18) this.moment = "midi"
                else this.moment = "soir"
                break
            }
        }
    }
}

export default TimeController