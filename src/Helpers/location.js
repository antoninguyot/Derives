import React, {useState} from 'react'
import axios from "axios";

let baseUrl = "https://sedac.ciesin.columbia.edu/arcgis/rest/services/sedac/pesv3Broker/GPServer/pesv3Broker/execute?f=json"
export const sedacDataset = 'gpw-v4-population-count-rev10_2020'

export const sedacLocationRequest = (latitude, longitude) => {
    let northEast = [longitude + 0.01, latitude + 0.01];
    let northWest = [longitude - 0.01, latitude + 0.01];
    let southEast = [longitude + 0.01, latitude - 0.01];
    let southWest = [longitude - 0.01, latitude - 0.01];

    let requestBody = new URLSearchParams({
        Input_data: JSON.stringify({
            polygon: [northEast, northWest, southWest, southEast],
            variables: [sedacDataset],
            statistics: ['SUM', 'MEAN'],
            requestID: '1614774593968eGNhEIFO'
        })
    })

    return axios.post(baseUrl, requestBody.toString())
}
export const locationRequest = (latitude, longitude) =>  {
    let params = new URLSearchParams({
        lat: latitude,
        lon: longitude,
        format: 'json',
        fields: 'surface,population'
    });

    return axios.get('https://geo.api.gouv.fr/communes?' + params.toString())
}