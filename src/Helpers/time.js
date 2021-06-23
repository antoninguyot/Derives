/**
 * Calcul de la season
 */
export const calculateSeason = () => {
  const month = (new Date()).getMonth();
  if (month >= 3 && month < 6) return 'printemps';
  if (month >= 6 && month < 9) return 'été';
  if (month >= 9 && month < 12) return 'automne';
  return 'hiver';
};

/**
 * Calcul du moment de la journée (en fonction de l'heure et de la season)
 * À passer sur l'API de la météo
 */
export const calculateMoment = () => {
  const hour = (new Date()).getHours();
  const season = calculateSeason();
  switch (season) {
    case 'printemps': {
      if (hour <= 6 || hour > 20) return 'nuit';
      if (hour > 6 && hour <= 12) return 'matin';
      if (hour > 12 && hour <= 17) return 'midi';
      return 'soir';
    }

    case 'été': {
      if (hour <= 5 || hour > 22) return 'nuit';
      if (hour > 5 && hour <= 12) return 'matin';
      if (hour > 12 && hour <= 18) return 'midi';
      return 'soir';
    }

    case 'automne': {
      if (hour <= 6 || hour > 20) return 'nuit';
      if (hour > 6 && hour <= 12) return 'matin';
      if (hour > 12 && hour <= 17) return 'midi';
      return 'soir';
    }

    case 'hiver': {
      if (hour <= 7 || hour > 19) return 'nuit';
      if (hour > 7 && hour <= 12) return 'matin';
      if (hour > 12 && hour <= 17) return 'midi';
      return 'soir';
    }

    default: {
      if (hour <= 5 || hour > 21) return 'nuit';
      if (hour > 5 && hour <= 12) return 'matin';
      if (hour > 10 && hour <= 18) return 'midi';
      return 'soir';
    }
  }
};

export const calculateNextMoment = (moment) => {
  switch (moment) {
    case 'nuit':
      return 'matin';
    case 'matin':
      return 'midi';
    case 'midi':
      return 'soir';
    case 'soir':
      return 'nuit';
    default:
      return null;
  }
};
