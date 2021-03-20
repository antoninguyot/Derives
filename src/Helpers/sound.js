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

const noiseFiles = {
    punctual: {
        matin:[
            require("../data/Musics/Bruitages/Sons_Ponctuels/Matin/01_Oiseaux.mp3"),
            require("../data/Musics/Bruitages/Sons_Ponctuels/Matin/02_Rires.mp3"),
            require("../data/Musics/Bruitages/Sons_Ponctuels/Matin/03_Chantiers.mp3"),
            require("../data/Musics/Bruitages/Sons_Ponctuels/Matin/04_Rumeurs.mp3"),
            require("../data/Musics/Bruitages/Sons_Ponctuels/Matin/05_Chants.mp3"),
            require("../data/Musics/Bruitages/Sons_Ponctuels/Matin/06_Bêtes.mp3")
        ],
        midi: [
            require("../data/Musics/Bruitages/Sons_Ponctuels/Midi/01_Pas.mp3"),
            require("../data/Musics/Bruitages/Sons_Ponctuels/Midi/01b_Pas.mp3"),
            require("../data/Musics/Bruitages/Sons_Ponctuels/Midi/01c_Pas.mp3"),
            require("../data/Musics/Bruitages/Sons_Ponctuels/Midi/02_Tempête.mp3"),
            require("../data/Musics/Bruitages/Sons_Ponctuels/Midi/03_Chants.mp3"),
            require("../data/Musics/Bruitages/Sons_Ponctuels/Midi/04_Guerre.mp3"),
            require("../data/Musics/Bruitages/Sons_Ponctuels/Midi/05_Navires.mp3"),
        ],
        soir: [
            require("../data/Musics/Bruitages/Sons_Ponctuels/Matin/01_Oiseaux.mp3"),
            require("../data/Musics/Bruitages/Sons_Ponctuels/Matin/02_Rires.mp3"),
            require("../data/Musics/Bruitages/Sons_Ponctuels/Matin/03_Chantiers.mp3"),
            require("../data/Musics/Bruitages/Sons_Ponctuels/Matin/04_Rumeurs.mp3"),
            require("../data/Musics/Bruitages/Sons_Ponctuels/Matin/05_Chants.mp3"),
            require("../data/Musics/Bruitages/Sons_Ponctuels/Matin/06_Bêtes.mp3")
        ],
        nuit:[
            require("../data/Musics/Bruitages/Sons_Ponctuels/Midi/01_Pas.mp3"),
            require("../data/Musics/Bruitages/Sons_Ponctuels/Midi/01b_Pas.mp3"),
            require("../data/Musics/Bruitages/Sons_Ponctuels/Midi/01c_Pas.mp3"),
            require("../data/Musics/Bruitages/Sons_Ponctuels/Midi/02_Tempête.mp3"),
            require("../data/Musics/Bruitages/Sons_Ponctuels/Midi/03_Chants.mp3"),
            require("../data/Musics/Bruitages/Sons_Ponctuels/Midi/04_Guerre.mp3"),
            require("../data/Musics/Bruitages/Sons_Ponctuels/Midi/05_Navires.mp3")
        ]
    },
    ambiance : {
        city: [
            require("../data/Musics/Bruitages/Sons_Ambiance/01_Ville.mp3"),
            require("../data/Musics/Bruitages/Sons_Ambiance/01b_Ville.mp3"),
            require("../data/Musics/Bruitages/Sons_Ambiance/01c_Ville.mp3"),
        ],
        country: [
            require("../data/Musics/Bruitages/Sons_Ambiance/02_Campagne.mp3"),
        ],
        beach: [
            require("../data/Musics/Bruitages/Sons_Ambiance/03_Mer.mp3"),
            require("../data/Musics/Bruitages/Sons_Ambiance/04_Plage.mp3"),
        ]
    },
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

export const punctualNoiseFor = async (moment) => {
    let random;
    let punctualNoiseFile;
    switch (moment) {
        case "matin": {
            random = Math.floor(Math.random() * 5)
            punctualNoiseFile = noiseFiles.punctual.matin[random]
            break
        }
        case "midi": {
            random = Math.floor(Math.random() * 6)
            punctualNoiseFile = noiseFiles.punctual.midi[random]
            break
        }
        case "soir": {
            random = Math.floor(Math.random() * 5)
            punctualNoiseFile = noiseFiles.punctual.matin[random]
            break
        }
        case "nuit": {
            random = Math.floor(Math.random() * 6)
            punctualNoiseFile = noiseFiles.punctual.midi[random]
            break
        }
        default: {
            break
        }
    }
    return Audio.Sound.createAsync(punctualNoiseFile)
}

export const ambianceNoiseFor = async (location) => {
    let ambianceNoiseFile;
    switch (location) {
        case "city": {
            ambianceNoiseFile = noiseFiles.ambiance.city[Math.floor(Math.random() * noiseFiles.ambiance.city.length)]
            break
        }
        case "country": {
            ambianceNoiseFile = noiseFiles.ambiance.country[Math.floor(Math.random() * noiseFiles.country.length)]
            break
        }
        case "beach": {
            ambianceNoiseFile = noiseFiles.ambiance.beach[Math.floor(Math.random() * noiseFiles.beach.length)]
            break
        }
        default: {
            break
        }
    }
    return Audio.Sound.createAsync(ambianceNoiseFile)
}
