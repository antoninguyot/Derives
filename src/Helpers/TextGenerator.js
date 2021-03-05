import Matin from "../data/Textes/Matin";
import Midi from "../data/Textes/Midi";
import Nuit from "../data/Textes/Nuit";
import Soir from "../data/Textes/Soir";
import WordBase from "../data/Textes/WordBase";

class TextGenerator {
    dispatcher;
    text;
    vers = "Commencez à marcher !"

    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }

    /**
     * Chargement du bon texte en fonction de la période de la journée
     * @private
     */
    _setText() {
        switch (this.dispatcher.state.time.moment) {
            case "matin":
                this.text = Matin
                break
            case "midi":
                this.text = Midi
                break
            case "soir":
                this.text = Soir
                break
            case "nuit":
                this.text = Nuit
                break
            default:
                console.log("le temps de la journée ne peut être déterminé")
        }
    }

    /**
     * Remplacement des balises qui représentent des mots variables dans les textes
     * @param {string} sentence
     */
    _interpret(sentence) {
        var sentence_new = ""
        for (var i = 0; i < sentence.length; i++) {
            if (sentence.charAt(i) == "$") {
                var index = parseInt(sentence.charAt(i + 2) + sentence.charAt(i + 3))
                var tab = ""
                switch (sentence.charAt(i + 1)) {
                    case "A":
                        tab = WordBase.A[index]
                        break
                    case "G":
                        tab = WordBase.G[index]
                        break
                    case "V":
                        tab = WordBase.V[index]
                        break
                    case "N":
                        tab = WordBase.N[index]
                        break
                    default:
                        sentence_new += "ERROR"
                }
                switch (sentence.charAt(i + 4)) {
                    case "A":
                        sentence_new += tab[Math.floor((Math.random() * tab.length))]
                        break
                    case "G":
                        if (this.dispatcher.state.location.localityType === "rural") sentence_new += tab.rural[Math.floor((Math.random() * tab.rural.length))]
                        if (this.dispatcher.state.location.localityType === "urbain") sentence_new += tab.urbain[Math.floor((Math.random() * tab.urbain.length))]
                        break
                    case "V":
                        if (this.dispatcher.state.location.speed < 2) sentence_new += tab.stationary[Math.floor((Math.random() * tab.stationary.length))]
                        else if (this.dispatcher.state.location.speed < 6.4) sentence_new += tab.walking[Math.floor((Math.random() * tab.walking.length))]
                        else if (this.dispatcher.state.location.speed < 8) sentence_new += tab.running[Math.floor((Math.random() * tab.running.length))]
                        else if (this.dispatcher.state.location.speed < 30) sentence_new += tab.cycling[Math.floor((Math.random() * tab.cycling.length))]
                        else  sentence_new += tab.in_vehicle[Math.floor((Math.random() * tab.in_vehicle.length))]
                        break
                    case "T":
                        if (this.dispatcher.state.weather.heat === "cold") sentence_new += tab.cold[Math.floor((Math.random() * tab.cold.length))]
                        if (this.dispatcher.state.weather.heat === "sweet") sentence_new += tab.cold[Math.floor((Math.random() * tab.sweet.length))]
                        if (this.dispatcher.state.weather.heat === "hot") sentence_new += tab.cold[Math.floor((Math.random() * tab.hot.length))]
                        break
                    case "S":
                        if (this.dispatcher.state.time.saison === "printemps") sentence_new += tab.printemps[Math.floor((Math.random() * tab.printemps.length))]
                        if (this.dispatcher.state.time.saison === "été") sentence_new += tab.été[Math.floor((Math.random() * tab.été.length))]
                        if (this.dispatcher.state.time.saison === "automne") sentence_new += tab.automne[Math.floor((Math.random() * tab.automne.length))]
                        if (this.dispatcher.state.time.saison === "hiver") sentence_new += tab.hiver[Math.floor((Math.random() * tab.hiver.length))]
                        break
                    default:
                        sentence_new += "ERROR"
                }
                i += 4
            } else {
                sentence_new += sentence.charAt(i)
            }
        }
        for (var i = 0; i < sentence_new.length; i++) {
            if (sentence_new.charAt(i) == "$") {
                sentence_new = this._interpret(sentence_new) //Permet de faire 2 niveaux d'interprétation
            }
        }
        return sentence_new
    }
}

export default TextGenerator
