import { Audio } from 'expo-av';

/**
 * Musiques
 * @type {{soir: *[], nuit: *[], midi: *[], matin: *[]}}
 */
const music = {
  matin: [
    require('../../assets/sounds/music/morning1.mp3'),
    require('../../assets/sounds/music/morning2.mp3'),
    require('../../assets/sounds/music/morning3.mp3'),
  ],
  midi: [
    require('../../assets/sounds/music/noon1.mp3'),
    require('../../assets/sounds/music/noon2.mp3'),
    require('../../assets/sounds/music/noon3.mp3'),
  ],
  soir: [
    require('../../assets/sounds/music/evening1.mp3'),
    require('../../assets/sounds/music/evening1.mp3'),
    require('../../assets/sounds/music/evening1.mp3'),
  ],
  nuit: [
    require('../../assets/sounds/music/night1.mp3'),
    require('../../assets/sounds/music/night1.mp3'),
    require('../../assets/sounds/music/night1.mp3'),
  ],
};

/**
 * Fichiers sonores pour l'accélération
 * @type {*[]}
 */
const accelerationFiles = [
  require('../../assets/sounds/effects/acceleration/S1.wav'),
  require('../../assets/sounds/effects/acceleration/S2.wav'),
  require('../../assets/sounds/effects/acceleration/S3.wav'),
  require('../../assets/sounds/effects/acceleration/S4.wav'),
  require('../../assets/sounds/effects/acceleration/S5.wav'),
  require('../../assets/sounds/effects/acceleration/S6.wav'),
  require('../../assets/sounds/effects/acceleration/S7.wav'),
  require('../../assets/sounds/effects/acceleration/S8.wav'),
  require('../../assets/sounds/effects/acceleration/S9.wav'),
  require('../../assets/sounds/effects/acceleration/S10.wav'),
  require('../../assets/sounds/effects/acceleration/S11.wav'),
  require('../../assets/sounds/effects/acceleration/S12.wav'),
  require('../../assets/sounds/effects/acceleration/S13.wav'),
  require('../../assets/sounds/effects/acceleration/S14.wav'),
  require('../../assets/sounds/effects/acceleration/S15.wav'),
  require('../../assets/sounds/effects/acceleration/S16.wav'),
  require('../../assets/sounds/effects/acceleration/S17.wav'),
  require('../../assets/sounds/effects/acceleration/S18.wav'),
  require('../../assets/sounds/effects/acceleration/S19.wav'),
  require('../../assets/sounds/effects/acceleration/S20.wav'),
  require('../../assets/sounds/effects/acceleration/S21.wav'),
  require('../../assets/sounds/effects/acceleration/S22.wav'),
  require('../../assets/sounds/effects/acceleration/S23.wav'),
  require('../../assets/sounds/effects/acceleration/S24.wav'),
  require('../../assets/sounds/effects/acceleration/S25.wav'),
  require('../../assets/sounds/effects/acceleration/S26.wav'),
  require('../../assets/sounds/effects/acceleration/S27.wav'),
  require('../../assets/sounds/effects/acceleration/S28.wav'),
];

/**
 * Fichiers sonores d'ambiance
 * @type {{country: *[], city: *[], beach: *[]}}
 */
const ambianceFiles = {
  city: [
    require('../../assets/sounds/effects/ambiance/city1.mp3'),
    require('../../assets/sounds/effects/ambiance/city2.mp3'),
    require('../../assets/sounds/effects/ambiance/city3.mp3'),
  ],
  country: [
    require('../../assets/sounds/effects/ambiance/country1.mp3'),
  ],
  beach: [
    require('../../assets/sounds/effects/ambiance/beach1.mp3'),
    require('../../assets/sounds/effects/ambiance/beach2.mp3'),
  ],
};

/**
 * Fichiers sonores ponctuels
 * @type {{midi: *[], matin: *[]}}
 */
const oneOffFiles = {
  matin: [
    require('../../assets/sounds/effects/oneoff/morning/01_Oiseaux.mp3'),
    require('../../assets/sounds/effects/oneoff/morning/02_Rires.mp3'),
    require('../../assets/sounds/effects/oneoff/morning/03_Chantiers.mp3'),
    require('../../assets/sounds/effects/oneoff/morning/04_Rumeurs.mp3'),
    require('../../assets/sounds/effects/oneoff/morning/05_Chants.mp3'),
    require('../../assets/sounds/effects/oneoff/morning/06_Bêtes.mp3'),
  ],
  midi: [
    require('../../assets/sounds/effects/oneoff/noon/01_Pas.mp3'),
    require('../../assets/sounds/effects/oneoff/noon/01b_Pas.mp3'),
    require('../../assets/sounds/effects/oneoff/noon/01c_Pas.mp3'),
    require('../../assets/sounds/effects/oneoff/noon/02_Tempête.mp3'),
    require('../../assets/sounds/effects/oneoff/noon/03_Chants.mp3'),
    require('../../assets/sounds/effects/oneoff/noon/04_Guerre.mp3'),
    require('../../assets/sounds/effects/oneoff/noon/05_Navires.mp3'),
  ],
};

/**
 * Joue un son à partir d'une URL, le décharge lorsqu'il est fini et retourne l'objet son
 * @param soundUrl
 * @returns {Promise<Sound>}
 */
export const play = async (soundUrl, vol) => {
  const { sound } = await Audio.Sound.createAsync(soundUrl, { shouldPlay: true, volume: vol });
  sound.setOnPlaybackStatusUpdate((status) => {
    if (!status.shouldPlay && !status.isPlaying && status.isLoaded) sound.unloadAsync();
  });
  return sound;
};

/**
 * Récupère une valeur aléatoire dans un tableau
 * @param array
 * @returns {*}
 */
const randomIn = (array) => array[Math.floor(Math.random() * array.length)];

/**
 * Retourne la musique en fonction du moment la journée
 * @param moment
 * @returns {*}
 */
export const getMusic = (moment) => {
  let musicFile;
  switch (moment) {
    case 'matin': {
      musicFile = randomIn(music.matin);
      break;
    }
    case 'midi': {
      musicFile = randomIn(music.midi);
      break;
    }
    case 'soir': {
      musicFile = randomIn(music.soir);
      break;
    }
    case 'nuit': {
      musicFile = randomIn(music.nuit);
      break;
    }
    default:
      return null;
  }
  return musicFile;
};

/**
 * Retourne un son ponctuel en scannant le vers en cours
 * @param moment
 * @param vers
 * @returns {*}
 */
export const getOneOff = (moment, vers) => {
  let random;
  let oneOffFile;
  switch (moment) {
    case 'matin': {
      if (vers.includes('oiseau')) {
        oneOffFile = oneOffFiles.matin[0];
      } else if (vers.includes('rire')) {
        oneOffFile = oneOffFiles.matin[1];
      } else if (vers.includes('chantier')) {
        oneOffFile = oneOffFiles.matin[2];
      } else if (vers.includes('rumeur')) {
        oneOffFile = oneOffFiles.matin[3];
      } else if (vers.includes('chant')) {
        oneOffFile = oneOffFiles.matin[4];
      } else if (vers.includes('bête')) {
        oneOffFile = oneOffFiles.matin[5];
      }
      break;
    }
    case 'midi': {
      if (vers.includes('pas')) {
        random = Math.floor(Math.random() * 3);
        oneOffFile = oneOffFiles.midi[random];
      } else if (vers.includes('tempête')) {
        oneOffFile = oneOffFiles.midi[3];
      } else if (vers.includes('chant')) {
        oneOffFile = oneOffFiles.midi[4];
      } else if (vers.includes('guerre')) {
        oneOffFile = oneOffFiles.midi[5];
      } else if (vers.includes('navire')) {
        oneOffFile = oneOffFiles.midi[6];
      }
      break;
    }
    case 'soir': {
      return null;
    }
    case 'nuit': {
      return null;
    }
    default: {
      return null;
    }
  }
  return oneOffFile;
};

/**
 * Retourne un son d'accélération aléatoire
 * @returns {*}
 */
export const getAcceleration = () => randomIn(accelerationFiles);

/**
 * Retourne un son d'ambiance en fonction de la localisation
 * @param location
 * @returns {*}
 */
export const getAmbiance = (location) => {
  let ambianceFile;
  switch (location) {
    case 'city': {
      ambianceFile = randomIn(ambianceFiles.city);
      break;
    }
    case 'country': {
      ambianceFile = randomIn(ambianceFiles.country);
      break;
    }
    case 'beach': {
      ambianceFile = randomIn(ambianceFiles.beach);
      break;
    }
    default: {
      break;
    }
  }
  return ambianceFile;
};
