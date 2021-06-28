/**
 * Calcul de la saison
 */
export const calculateSeason = () => {
  const d = new Date();

  const saisons = [
    // On entre les dates des solstices en prenant en compte les années bissextiles (% 4)
    { name: 'printemps', date: new Date(d.getFullYear(), 2, (d.getFullYear() % 4 === 0) ? 19 : 20).getTime() },
    { name: 'été', date: new Date(d.getFullYear(), 5, (d.getFullYear() % 4 === 0) ? 20 : 21).getTime() },
    { name: 'automne', date: new Date(d.getFullYear(), 8, (d.getFullYear() % 4 === 0) ? 22 : 23).getTime() },
    { name: 'hiver', date: new Date(d.getFullYear(), 11, (d.getFullYear() % 4 === 0) ? 20 : 21).getTime() },
  ];

  const saison = saisons.filter(({ date }) => date <= d).slice(-1)[0] || { name: 'hiver' };
  return saison.name;
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
