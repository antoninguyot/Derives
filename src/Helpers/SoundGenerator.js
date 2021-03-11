import {Audio} from "expo-av";

const SoundGenerator = (time) => {
    // Liste des fichiers audios d'ambiance en fonction du moment
    let audioFiles = {
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

    /**
     * Chargement du bon fichier audio en fonction de la journée
     */
    const startSound = () => {
        let random = Math.floor((Math.random() * 3))
        let url;
        switch (time.moment) {
            case "matin": {
                url = audioFiles.matin[random]
                break
            }
            case "midi": {
                url = audioFiles.midi[random]
                break
            }
            case "soir": {
                url = audioFiles.matin[random]
                break
            }
            case "nuit": {
                url = audioFiles.matin[random]
                break
            }
            default: {
                url = require("../data/Musics/easter_egg.mp3")
                break
            }
        }
        return url
    }

    return Audio.Sound.createAsync(startSound()).then(promise => promise.sound.playAsync());
}

export default SoundGenerator
