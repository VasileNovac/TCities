"use client";

import React, { Component, useState, useEffect } from 'react' ;

export default function CityGeo(idCity) {
    const [data, setData] = useState("");

    useEffect( () => {
        fetch('https://geocoding-api.open-meteo.com/v1/get?id='+idCity)
            .then(res => res.json() )
            .then(data => setData({
                id: data.id,
                name: data.name,
                latitude: data.latitude,
                longitude: data.longitude,
                country: data.country,
                country_code: data.country_code,
                admin1: data.admin1,
                admin2: data.admin2,
                timezone: data.timezone,
            }))
            .catch(error => console.error('Error fetching data CityGeo: ', error));
    }, []);

    return ( data );
}
