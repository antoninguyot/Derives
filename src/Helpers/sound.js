import {Audio} from "expo-av";

const soundFiles = {
  matin: [
    require("../../assets/sounds/music/morning1.mp3"),
    require("../../assets/sounds/music/morning2.mp3"),
    require("../../assets/sounds/music/morning3.mp3")
  ],
  midi: [
    require("../../assets/sounds/music/noon1.mp3"),
    require("../../assets/sounds/music/noon2.mp3"),
    require("../../assets/sounds/music/noon3.mp3")
  ],
  soir: [
    require("../../assets/sounds/music/evening1.mp3"),
    require("../../assets/sounds/music/evening1.mp3"),
    require("../../assets/sounds/music/evening1.mp3"),
  ],
  nuit: [
    require("../../assets/sounds/music/night1.mp3"),
    require("../../assets/sounds/music/night1.mp3"),
    require("../../assets/sounds/music/night1.mp3"),
  ]
}

const noiseFiles = {
  punctual: {
    matin: [
      require("../../assets/sounds/effects/oneoff/morning/01_Oiseaux.mp3"),
      require("../../assets/sounds/effects/oneoff/morning/02_Rires.mp3"),
      require("../../assets/sounds/effects/oneoff/morning/03_Chantiers.mp3"),
      require("../../assets/sounds/effects/oneoff/morning/04_Rumeurs.mp3"),
      require("../../assets/sounds/effects/oneoff/morning/05_Chants.mp3"),
      require("../../assets/sounds/effects/oneoff/morning/06_Bêtes.mp3")
    ],
    midi: [
      require("../../assets/sounds/effects/oneoff/noon/01_Pas.mp3"),
      require("../../assets/sounds/effects/oneoff/noon/01b_Pas.mp3"),
      require("../../assets/sounds/effects/oneoff/noon/01c_Pas.mp3"),
      require("../../assets/sounds/effects/oneoff/noon/02_Tempête.mp3"),
      require("../../assets/sounds/effects/oneoff/noon/03_Chants.mp3"),
      require("../../assets/sounds/effects/oneoff/noon/04_Guerre.mp3"),
      require("../../assets/sounds/effects/oneoff/noon/05_Navires.mp3"),
    ],
    acceleration: [
      require("../../assets/sounds/effects/acceleration/S1.wav"),
      require("../../assets/sounds/effects/acceleration/S2.wav"),
      require("../../assets/sounds/effects/acceleration/S3.wav"),
      require("../../assets/sounds/effects/acceleration/S4.wav"),
      require("../../assets/sounds/effects/acceleration/S5.wav"),
      require("../../assets/sounds/effects/acceleration/S6.wav"),
      require("../../assets/sounds/effects/acceleration/S7.wav"),
      require("../../assets/sounds/effects/acceleration/S8.wav"),
      require("../../assets/sounds/effects/acceleration/S9.wav"),
      require("../../assets/sounds/effects/acceleration/S10.wav"),
      require("../../assets/sounds/effects/acceleration/S11.wav"),
      require("../../assets/sounds/effects/acceleration/S12.wav"),
      require("../../assets/sounds/effects/acceleration/S13.wav"),
      require("../../assets/sounds/effects/acceleration/S14.wav"),
      require("../../assets/sounds/effects/acceleration/S15.wav"),
      require("../../assets/sounds/effects/acceleration/S16.wav"),
      require("../../assets/sounds/effects/acceleration/S17.wav"),
      require("../../assets/sounds/effects/acceleration/S18.wav"),
      require("../../assets/sounds/effects/acceleration/S19.wav"),
      require("../../assets/sounds/effects/acceleration/S20.wav"),
      require("../../assets/sounds/effects/acceleration/S21.wav"),
      require("../../assets/sounds/effects/acceleration/S22.wav"),
      require("../../assets/sounds/effects/acceleration/S23.wav"),
      require("../../assets/sounds/effects/acceleration/S24.wav"),
      require("../../assets/sounds/effects/acceleration/S25.wav"),
      require("../../assets/sounds/effects/acceleration/S26.wav"),
      require("../../assets/sounds/effects/acceleration/S27.wav"),
      require("../../assets/sounds/effects/acceleration/S28.wav")
    ]
  },
  ambiance: {
    city: [
      require("../../assets/sounds/effects/ambiance/city1.mp3"),
      require("../../assets/sounds/effects/ambiance/city2.mp3"),
      require("../../assets/sounds/effects/ambiance/city3.mp3"),
    ],
    country: [
      require("../../assets/sounds/effects/ambiance/country1.mp3"),
    ],
    beach: [
      require("../../assets/sounds/effects/ambiance/beach1.mp3"),
      require("../../assets/sounds/effects/ambiance/beach2.mp3"),
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
  return Audio.Sound.createAsync(urlSound, {shouldPlay: true, volume: 0.6})
}
export const playMusic = async (urlSound) => {
  let music = new Audio.Sound()
  if (!urlSound) return
  music = await Audio.Sound.createAsync(urlSound, {shouldPlay: true})
  await music.sound.unloadAsync()
}
//BRUITS
export const punctualNoiseFor = async (moment, vers) => {
  let random;
  let music;
  let punctualNoiseFile;
  switch (moment) {
    case "matin": {
      if (vers.includes("oiseau")) {
        punctualNoiseFile = noiseFiles.punctual.matin[0]
      } else if (vers.includes("rire")) {
        punctualNoiseFile = noiseFiles.punctual.matin[1]
      } else if (vers.includes("chantier")) {
        punctualNoiseFile = noiseFiles.punctual.matin[2]
      } else if (vers.includes("rumeur")) {
        punctualNoiseFile = noiseFiles.punctual.matin[3]
      } else if (vers.includes("chant")) {
        punctualNoiseFile = noiseFiles.punctual.matin[4]
      } else if (vers.includes("bête")) {
        punctualNoiseFile = noiseFiles.punctual.matin[5]
      }
      break
    }
    case "midi": {
      if (vers.includes("pas")) {
        random = Math.floor(Math.random() * 3)
        punctualNoiseFile = noiseFiles.punctual.midi[random]
      } else if (vers.includes("tempête")) {
        punctualNoiseFile = noiseFiles.punctual.midi[3]
      } else if (vers.includes("chant")) {
        punctualNoiseFile = noiseFiles.punctual.midi[4]
      } else if (vers.includes("guerre")) {
        punctualNoiseFile = noiseFiles.punctual.midi[5]
      } else if (vers.includes("navire")) {
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
  music = await Audio.Sound.createAsync(punctualNoiseFile, {shouldPlay: true, volume: 0.1})
  await music.sound.unloadAsync()
  return music
}

export const speedNoiseFor = (moment) => {
  let random = Math.floor(Math.random() * 28)
  let speepNoiseFile = noiseFiles.punctual.acceleration[random]
  return Audio.Sound.createAsync(speepNoiseFile, {shouldPlay: true, volume: 0.2})

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
  return Audio.Sound.createAsync(ambianceNoiseFile, {shouldPlay: true, volume: 0.6})
}
