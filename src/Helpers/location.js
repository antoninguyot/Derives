import axios from 'axios';

const circleToPolygon = require('circle-to-polygon');

const worldPopBase = 'https://api.worldpop.org/v1/services/stats';

/**
 * Retourne la moyenne d'habitants / m^2
 * @param latitude
 * @param longitude
 * @returns {Promise<boolean|number>}
 */
export const worldPopLocationRequest = async (longitude, latitude) => {
  const radius = 1; // Circle radius in kilometers
  const requestBody = {
    dataset: 'wpgppop',
    year: '2015', // 2015 dataset from Worldpop
    geojson: {
      type: 'Feature',
      properties: {},
      // Generate a pseudo-circle shape since circles are not supported in GeoJSON
      // see https://github.com/gabzim/circle-to-polygon
      geometry: circleToPolygon([longitude, latitude], radius * 1000),
    },
    runasync: false, // We want to get the result synchronously
  };

  const { data: response } = await axios.get(worldPopBase, { params: requestBody });
  if (response.error) return 0;
  if (Number.isNaN(response.data.total_population)) return 0;
  return Math.round(response.data.total_population / (Math.PI * radius));
};
