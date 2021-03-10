import axios from "axios";
import { useState } from "react";

const WeatherController = (location) => {
    // Accessible par n'importe qui qui inspecte le bundle de l'app :/
    //#apiToken = '8b154e655b6e2d24d86ede9d844a2f4c';

    let baseUrl = 'http://api.openweathermap.org/data/2.5/weather';
    let apiToken = '8b154e655b6e2d24d86ede9d844a2f4c';
    const [temperature, setTemperature] = useState(0)
    const [heat, setHeat] = useState(null)
    const [sunset, setSunset] = useState(0)

    useEffect(()=>{
        initValues()
      }, [temperature, sunset, heat])

    const initValues = () => {
      weatherRequest()
          .then((function (response) {
            setTemperature(response.data.main.temp)
            setSunset(response.data.sys.sunset)

            // Inférer un état de la température
            if (temperature < 12) {
                setHeat("cold")
            } else if (temperature > 25) {
                setHeat("hot")
            } else {
                setHeat("sweet")
            }
        }).bind(this));
      return {temperature, sunset, heat}
    }

    const weatherRequest = () => {
        let params = new URLSearchParams({
            'lat': location.latitude,
            'lon': location.longitude,
            // 'lat': '48.856613',
            // 'lon': '2.352222',
            'appid': apiToken,
            'units': 'metrics'
        })

        return axios.get(baseUrl + '?' + params.toString())
    }
}

export default WeatherController