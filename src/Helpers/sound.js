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
 * Fichiers sonores d'ambiance
 * @type {{country: *[], city: *[], beach: *[]}}
 */
const ambianceFiles = {
  city: [
    require('../../assets/sounds/ambiance/city1.mp3'),
    require('../../assets/sounds/ambiance/city2.mp3'),
    require('../../assets/sounds/ambiance/city3.mp3'),
  ],
  country: [
    require('../../assets/sounds/ambiance/country1.mp3'),
  ],
  beach: [
    require('../../assets/sounds/ambiance/beach1.mp3'),
    require('../../assets/sounds/ambiance/beach2.mp3'),
  ],
};

/**
 * Joue un son à partir d'une URL, le décharge lorsqu'il est fini et retourne l'objet son
 * @param soundUrl,
 * @param vol,
 * @param islooping
 * @returns {Promise<Sound>}
 */
export const play = async (soundUrl, vol, islooping) => {
  // eslint-disable-next-line max-len
  const { sound } = await Audio.Sound.createAsync(soundUrl, { shouldPlay: true, volume: vol, isLooping: islooping });
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
