import axios from "axios";

class WeatherController {
    // Accessible par n'importe qui qui inspecte le bundle de l'app :/
    #apiToken = '8b154e655b6e2d24d86ede9d844a2f4c';

    #baseUrl = 'http://api.openweathermap.org/data/2.5/weather';

    temperature = 0
    heat = null
    sunset = 0

    constructor(dispatcher) {
        this.dispatcher = dispatcher
        this.initValues()
    }

    initValues() {
        this.weatherRequest()
            .then((function (response) {
                this.temperature = response.data.main.temp
                this.sunset = response.data.sys.sunset

                // Inférer un état de la température
                if (self.temperature < 12) {
                    this.heat = "cold"
                } else if (this.temperature > 25) {
                    this.heat = "hot"
                } else {
                    this.heat = "sweet"
                }
            }).bind(this));
    }

    weatherRequest() {
        let params = new URLSearchParams({
            // 'lat': this.dispatcher.state.location.latitude,
            // 'lon': this.dispatcher.state.location.longitude,
            'lat': '48.856613',
            'lon': '2.352222',
            'appid': this.#apiToken,
            'units': 'metrics'
        })

        return axios.get(this.#baseUrl + '?' + params.toString())
    }
}

export default WeatherController