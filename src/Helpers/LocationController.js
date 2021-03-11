import * as Location from 'expo-location';
import axios from "axios";
import { useState } from 'react';

const LocationController = (isMounted) => {

    const [location, setLocation] = useState()
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [speed, setSpeed] = useState()
    const [localityName, setLocalityName] = useState()
    const [localityPopulation, setLocalityPopulation] = useState()
    const [localitySurface, setLocalitySurface] = useState()
    const [localityDensity, setLocalityDensity] = useState()
    const [localityType, setLocalityType] = useState()

    const [state, setState] = useState({
        longitude: null,
        latitude: null,
        speed: null,
        localityName: null,
        localityPopulation: null,
        localitySurface: null,
        localityDensity: null,
        localityType: null,
    })
    useEffect(()=>{
        askPermissions()
        initValues()
      }, [])

    const askPermissions = () => {
        Location.requestPermissionsAsync()
    }

    /**
     * Initialisation des valeurs
     */
    const initValues = () => {
        Location.getCurrentPositionAsync().then(updateLocation.bind(this))
        // On update la position GPS en direct
        Location.watchPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
            distanceInterval: 1
        }, updateLocation.bind(this));
    }

    /**
     * Callback utilisé à chaque fois que la position est mise à jour
     * 1. Met à jour la position, la vitesse
     * 2. Récupère les infos sur la position (la première fois seulement)
     * 3. Met à jour les coeffs de l'écran principal
     * @param {Object} location
     */
    const updateLocation = (location) => {
        if (! isMounted) {
            return;
        }

        // On ne veut faire une requête API que la première fois
        let doLocationRequest = (location === undefined);

        location = location
        setLatitude(location.coords.latitude)
        setLongitude(location.coords.longitude)
        setSpeed(location.coords.speed)

        if (doLocationRequest) {
            locationRequest()
                .then((function (response) {
                    let locality = response.data[0];
                    if (locality) {
                        setLocalityName(locality.nom)
                        setLocalityPopulation(locality.population)
                        setLocalitySurface(locality.surface)
                        setLocalityDensity(localityPopulation * 100 / localitySurface)
                        setLocalityType(localityDensity >= 376 ? 'city' : 'country')
                    }
                }).bind(this))
        }

        // On infère le type de déplacement de la vitesse
        if (speed < 2) {
            // Statique
            this.dispatcher.setState({coefPolice: 1, nbLines: 4})
        } else if (speed < 6.4) {
            // À pied
            this.dispatcher.setState({ coefTextSpeed: 5, coefPolice: 2, nbLines: 3 })
        } else if (speed < 8){
            // En courant
            this.dispatcher.setState({ coefTextSpeed: 3, coefPolice: 3, nbLines: 2 })
        } else {
            // Autre mode de déplacement (vélo, voiture)
            this.dispatcher.setState({ coefTextSpeed: 1, coefPolice: 4, nbLines: 1 })
        }
    }

    const locationRequest = () => {
        let params = new URLSearchParams({
            lat: latitude,
            lon: longitude,
            format: 'json',
            fields: 'surface,population'
        });

        return axios.get('https://geo.api.gouv.fr/communes?' + params.toString())
    }

}

export default LocationController