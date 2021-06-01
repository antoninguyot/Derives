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

  const { data: response } = await axios.get(baseUrl, { params: requestBody });
  if (Number.isNaN(response.main.temp)) return 0;
  return response.main.temp;
};
