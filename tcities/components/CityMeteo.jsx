"use client";

import React, { Component, useState, useEffect } from 'react' ;

export default function CityMeteo(latCity, longCity) {
  const [data, setData] = useState("");
    
  useEffect( () => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latCity}&longitude=${longCity}&current=temperature_2m,relative_humidity_2m,precipitation,surface_pressure,wind_speed_10m&forecast_days=1`)
      .then( res => res.json() )
      .then( data => setData({
        dataOra: data.current.time,
        timeZone: data.timezone,
        temperatura: data.current.temperature_2m,
        unitTemperatura: data.current_units.temperature_2m,
        umiditate: data.current.relative_humidity_2m,
        unitUmiditate: data.current_units.relative_humidity_2m,
        precipitatie: data.current.precipitation,
        unitPrecipitatie: data.current_units.precipitation,
        presiune: data.current.surface_pressure,
        unitPresiune: data.current_units.surface_pressure,
        vitezaVant: data.current.wind_speed_10m,
        unitVitezaVant: data.current_units.wind_speed_10m
      }))
      .catch(error => console.error('Error fetching data:', error));
    }, []);
  
  return ( data )
}
