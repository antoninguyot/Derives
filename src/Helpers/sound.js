import {Audio} from "expo-av";

const soundFiles = {
    matin: [
        require("../data/Musics/Musics/matin_mus_1.mp3"),
        require("../data/Musics/Musics/matin_mus_2.mp3"),
        require("../data/Musics/Musics/matin_mus_3.mp3")
    ],
    midi: [
        require("../data/Musics/Musics/midi_mus_1.mp3"),
        require("../data/Musics/Musics/midi_mus_2.mp3"),
        require("../data/Musics/Musics/midi_mus_3.mp3")
    ],
    soir: [
        require("../data/Musics/Musics/soir_mus_1.mp3"),
        require("../data/Musics/Musics/soir_mus_1.mp3"),
        require("../data/Musics/Musics/soir_mus_1.mp3"),
    ],
    nuit:[
        require("../data/Musics/Musics/nuit_mus_1.mp3"),
        require("../data/Musics/Musics/nuit_mus_1.mp3"),
        require("../data/Musics/Musics/nuit_mus_1.mp3"),
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
        acceleration: [
            require("../data/Musics/Bruitages/Sons_Acceleration/S1.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S2.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S3.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S4.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S5.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S6.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S7.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S8.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S9.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S10.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S11.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S12.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S13.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S14.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S15.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S16.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S17.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S18.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S19.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S20.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S21.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S22.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S23.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S24.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S25.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S26.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S27.wav"),
            require("../data/Musics/Bruitages/Sons_Acceleration/S28.wav")
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
//URL DE LA MUSIQUE
export const getUrlSound = (moment) => {
    let random = Math.floor((Math.random() * 3))

    switch (moment) {
        case "matin": {
            return soundFiles.matin[random]
        }
        case "midi": {
            return soundFiles.midi[random]
        }
        case "soir": {
            return soundFiles.soir[random]
        }
        case "nuit": {
            return soundFiles.nuit[random]
        }
        default: {
            return null
        }
    }
}
//MUSIQUE
export const soundFor = async (urlSound) => {
    return Audio.Sound.createAsync(urlSound,{shouldPlay:true,volume:0.6})
}
export const playMusic = async(urlSound) => {
    let music = new Audio.Sound()
    if (!urlSound) return
    music = await Audio.Sound.createAsync(urlSound,{shouldPlay: true})
    await music.sound.unloadAsync()
}
//BRUITS
export const punctualNoiseFor = async (moment,vers) => {
    let random;
    let music;
    let punctualNoiseFile;
    switch (moment) {
        case "matin": {
            if (vers.includes("oiseau")){
                punctualNoiseFile = noiseFiles.punctual.matin[0]
            }
            else if (vers.includes("rire")){
                punctualNoiseFile = noiseFiles.punctual.matin[1]
            }
            else if (vers.includes("chantier")){
                punctualNoiseFile = noiseFiles.punctual.matin[2]
            }
            else if (vers.includes("rumeur")){
                punctualNoiseFile = noiseFiles.punctual.matin[3]
            }
            else if (vers.includes("chant")){
                punctualNoiseFile = noiseFiles.punctual.matin[4]
            }
            else if (vers.includes("bête")){
                punctualNoiseFile = noiseFiles.punctual.matin[5]
            }
            break
        }
        case "midi": {
            if (vers.includes("pas")){
                random = Math.floor(Math.random()*3)
                punctualNoiseFile = noiseFiles.punctual.midi[random]
            }
            else if (vers.includes("tempête")){
                punctualNoiseFile = noiseFiles.punctual.midi[3]
            }
            else if (vers.includes("chant")){
                punctualNoiseFile = noiseFiles.punctual.midi[4]
            }
            else if (vers.includes("guerre")){
                punctualNoiseFile = noiseFiles.punctual.midi[5]
            }
            else if (vers.includes("navire")){
                punctualNoiseFile = noiseFiles.punctual.midi[6]
            }
            break
        }
        case "soir": {
            return
        }
        case "nuit": {
            return
        }
        default: {
            break
        }
    }
    music = await Audio.Sound.createAsync(punctualNoiseFile,{shouldPlay:true,volume:0.1})
    await music.sound.unloadAsync()
    return music
}

export const speedNoiseFor= (moment) => {
    let random = Math.floor(Math.random()*28)
    let speepNoiseFile = noiseFiles.punctual.acceleration[random]
    return Audio.Sound.createAsync(speepNoiseFile,{shouldPlay:true,volume:0.2})

}
//AMBIANCE
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
    return Audio.Sound.createAsync(ambianceNoiseFile,{shouldPlay : true, volume:0.6})
}
