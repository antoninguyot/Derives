import * as Location from 'expo-location';
import axios from "axios";

class LocationController {

    location;
    latitude;
    longitude;
    speed;
    localityName;
    localityPopulation;
    localitySurface;
    localityDensity;
    localityType;

    constructor(dispatcher) {
        this.dispatcher = dispatcher
        this.askPermissions()
        this.initValues()
    }

    askPermissions() {
        Location.requestPermissionsAsync()
    }

    /**
     * Initialisation des valeurs
     */
    initValues() {
        Location.getCurrentPositionAsync().then(this.updateLocation.bind(this))
        // On update la position GPS en direct
        Location.watchPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
            distanceInterval: 1
        }, this.updateLocation.bind(this));
    }

    /**
     * Callback utilisé à chaque fois que la position est mise à jour
     * 1. Met à jour la position, la vitesse
     * 2. Récupère les infos sur la position (la première fois seulement)
     * 3. Met à jour les coeffs de l'écran principal
     * @param {Object} location
     */
    updateLocation(location) {
        if (! this.dispatcher._isMounted) {
            return;
        }

        // On ne veut faire une requête API que la première fois
        let doLocationRequest = (this.location === undefined);

        this.location = location
        this.latitude = location.coords.latitude
        this.longitude = location.coords.longitude
        this.speed = location.coords.speed

        if (doLocationRequest) {
            this.locationRequest()
                .then((function (response) {
                    let locality = response.data[0];
                    if (locality) {
                        this.localityName = locality.nom
                        this.localityPopulation = locality.population
                        this.localitySurface = locality.surface
                        this.localityDensity = this.localityPopulation * 100 / this.localitySurface
                        this.localityType = this.localityDensity >= 376 ? 'city' : 'country';
                    }
                }).bind(this))
        }

        // On infère le type de déplacement de la vitesse
        if (this.speed < 2) {
            // Statique
            this.dispatcher.setState({coefPolice: 1, nbLines: 4})
        } else if (this.speed < 6.4) {
            // À pied
            this.dispatcher.setState({ coefTextSpeed: 5, coefPolice: 2, nbLines: 3 })
        } else if (this.speed < 8){
            // En courant
            this.dispatcher.setState({ coefTextSpeed: 3, coefPolice: 3, nbLines: 2 })
        } else {
            // Autre mode de déplacement (vélo, voiture)
            this.dispatcher.setState({ coefTextSpeed: 1, coefPolice: 4, nbLines: 1 })
        }
    }

    locationRequest() {
        let params = new URLSearchParams({
            lat: this.latitude,
            lon: this.longitude,
            format: 'json',
            fields: 'surface,population'
        });

        return axios.get('https://geo.api.gouv.fr/communes?' + params.toString())
    }

}

export default LocationController