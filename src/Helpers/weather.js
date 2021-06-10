import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiToken = '8b154e655b6e2d24d86ede9d844a2f4c';

export default async (longitude, latitude) => {
  const requestBody = {
    lat: latitude,
    lon: longitude,
    appid: apiToken,
    units: 'metric',
  };

  try {
    const { data: response } = await axios.get(baseUrl, { params: requestBody, timeout: 5000 });
    if (Number.isNaN(response.main.temp)) return 0;
    return response.main.temp;
  } catch (e) {
    // Si il y a une erreur dans notre requête on renvoie une valeur par défaut pas trop déconnante
    return 15;
  }
};
