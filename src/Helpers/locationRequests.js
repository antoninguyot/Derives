import * as Location from 'expo-location'
import React, {useState} from 'react'

export const askPermissions = () => {
    Location.requestPermissionsAsync()
}

export const initLocationValues = () => {
    Location.getCurrentPositionAsync().then(updateLocation)
    // On update la position GPS en direct
    Location.watchPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 1
    }, updateLocation);
}

/**
 * Callback utilisé à chaque fois que la position est mise à jour
 * 1. Met à jour la position, la vitesse
 * 2. Récupère les infos sur la position (la première fois seulement)
 * 3. Met à jour les coeffs de l'écran principal
 * @param {Object} location
 */
export const updateLocation = (location) => {

    if (! isMounted) {
        return;
    }

    // On ne veut faire une requête API que la première fois
    let doLocationRequest = (location === undefined);

    setLocation2({longitude: location.coords.longitude})
    setLocation2({latitude: location.coords.latitude})
    setLocation2({speed: location.coords.speed})

    if (doLocationRequest) {
        locationRequest()
            .then((function (response) {
                let locality = response.data[0];
                if (locality) {
                    setLocation2({localityName: locality.nom})
                    setLocation2({localityPopulation: locality.population})
                    setLocation2({localitySurface: locality.surface})
                    setLocation2({localityDensity: localityPopulation * 100 / localitySurface})
                    setLocation2({localityType: localityDensity >= 376 ? 'city' : 'country'})
                }
            }))
    }

    // On infère le type de déplacement de la vitesse
    // if (speed < 2) {
    //     // Statique
    //     this.dispatcher.setState({coefPolice: 1, nbLines: 4})
    // } else if (speed < 6.4) {
    //     // À pied
    //     this.dispatcher.setState({ coefTextSpeed: 5, coefPolice: 2, nbLines: 3 })
    // } else if (speed < 8){
    //     // En courant
    //     this.dispatcher.setState({ coefTextSpeed: 3, coefPolice: 3, nbLines: 2 })
    // } else {
    //     // Autre mode de déplacement (vélo, voiture)
    //     this.dispatcher.setState({ coefTextSpeed: 1, coefPolice: 4, nbLines: 1 })
    // }
    console.log(location2)
    return location2
}


export const locationRequest = () =>  {
    let params = new URLSearchParams({
        lat: latitude,
        lon: longitude,
        format: 'json',
        fields: 'surface,population'
    });

    return axios.get('https://geo.api.gouv.fr/communes?' + params.toString())
}

export const getLocation = () => {
    askPermissions()
    initLocationValues()
}