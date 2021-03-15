import React, {useState} from 'react'
import axios from "axios";


export const locationRequest = (latitude, longitude) =>  {
    let params = new URLSearchParams({
        lat: latitude,
        lon: longitude,
        format: 'json',
        fields: 'surface,population'
    });

    return axios.get('https://geo.api.gouv.fr/communes?' + params.toString())
}