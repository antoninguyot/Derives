export function setColorBackground(moment) {
  switch (moment) {
    case 'matin':
      return '#FFE782';
    case 'midi':
      return '#87CEEB';
    case 'soir':
      return '#FF8C00';
    case 'nuit':
      return '#0F056B';
    default:
      return null;
  }
}

export function setColorWriting(moment) {
  switch (moment) {
    case 'matin':
      return '#999';
    case 'midi':
      return '#fff';
    case 'soir':
      return '#000';
    case 'nuit':
      return '#fff';
    default:
      return null;
  }
}
