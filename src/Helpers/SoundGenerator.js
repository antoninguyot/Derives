import {Audio} from "expo-av";

const SoundGenerator = () => {


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
    const startSound = (time) => {
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
        // On crée le fichier audio et le on play dans la foulée
        Audio.Sound.createAsync(url).then(promise => promise.sound.playAsync());
    }
}

export default SoundGenerator