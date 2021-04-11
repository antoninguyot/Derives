import axios from "axios";

let baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
let apiToken = '8b154e655b6e2d24d86ede9d844a2f4c';

export const weatherRequest = (latitude, longitude) => {
  let params = new URLSearchParams({
    'lat': latitude,
    'lon': longitude,
    'appid': apiToken,
    'units': 'metric'
  })

  return axios.get(baseUrl + '?' + params.toString())
}
