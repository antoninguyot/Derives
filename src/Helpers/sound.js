import {Audio} from "expo-av";

const soundFiles = {
    matin: [
        require("../data/Musics/matin_mus_1.mp3"),
        require("../data/Musics/matin_mus_2.mp3"),
        require("../data/Musics/matin_mus_3.mp3")
    ],
    midi: [
        require("../data/Musics/midi_mus_1.mp3"),
        require("../data/Musics/midi_mus_2.mp3"),
        require("../data/Musics/midi_mus_3.mp3")
    ],
    soir: [
        require("../data/Musics/midi_mus_1.mp3"),
        require("../data/Musics/midi_mus_2.mp3"),
        require("../data/Musics/midi_mus_3.mp3")
    ],
    nuit:[
        require("../data/Musics/midi_mus_1.mp3"),
        require("../data/Musics/midi_mus_2.mp3"),
        require("../data/Musics/midi_mus_3.mp3")
    ]
}

export const soundFor = async (moment) => {

    let random = Math.floor((Math.random() * 3))
    let soundFile;

    switch (moment) {
        case "matin": {
            soundFile = soundFiles.matin[random]
            break
        }
        case "midi": {
            soundFile = soundFiles.midi[random]
            break
        }
        case "soir": {
            soundFile = soundFiles.soir[random]
            break
        }
        case "nuit": {
            soundFile = soundFiles.nuit[random]
            break
        }
        default: {
            break
        }
    }

    return Audio.Sound.createAsync(soundFile)
}
