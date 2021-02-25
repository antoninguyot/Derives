import {Audio} from "expo-av";

class SoundGenerator {

    dispatcher;

    // Liste des fichiers audios d'ambiance en fonction du moment
    audioFiles = {
        matin: [
            require("../data/Musics/matin_mus_1.mp3"),
            require("../data/Musics/matin_mus_2.mp3"),
            require("../data/Musics/matin_mus_3.mp3")
        ],
        midi: [
            require("../data/Musics/midi_mus_1.mp3"),
            require("../data/Musics/midi_mus_2.mp3"),
            require("../data/Musics/midi_mus_3.mp3")
        ]
    }

    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }

    /**
     * Chargement du bon fichier audio en fonction de la journée
     */
    start() {
        let random = Math.floor((Math.random() * 3))
        let url;
        switch (this.dispatcher.state.time.moment) {
            case "matin": {
                url = this.audioFiles.matin[random]
                break
            }
            case "midi": {
                url = this.audioFiles.midi[random]
                break
            }
            case "soir": {
                url = this.audioFiles.matin[random]
                break
            }
            case "nuit": {
                url = this.audioFiles.matin[random]
                break
            }
            default: {
                url = require("../data/Musics/easter_egg.mp3")
                break
            }
        }
        // On crée le fichier audio et le on play dans la foulée
        Audio.Sound.createAsync(url).then(promise => promise.sound.playAsync());
    }
}

export default SoundGenerator