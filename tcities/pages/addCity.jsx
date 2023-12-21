
import React, { Component, useState, useEffect } from 'react' ;
import '/app/globals.css' ;
import CityFoto from "@/components/CityFoto" ;
import CityMeteo from "@/components/CityMeteo" ;
import CityGeo from   "@/components/CityGeo" ;
import Navbar from "@/components/Navbar";
import Link from 'next/link' ;

import { useRouter } from "next/router";

function Header({ title }) {
    return <h1>{title ? title : 'Default title'}</h1>;
}

export default function AddCity() {
    const { query: {id, name, latitude, longitude, sfoto} } = useRouter() ;
    const props = {id, name, latitude, longitude, sfoto} ;
  
    const [idx, setIdx] = useState(props.id);
    const [nume, setNume] = useState(props.name);
    const [lat, setLat] = useState(props.latitude);
    const [long, setLong] = useState(props.longitude);
    const [foto, setFoto] = useState(props.sfoto);
    const [nota, setNota] = useState("");
    const [comm, setComm] = useState("");

    const image = CityFoto(props.name);
    const geo = CityGeo(props.id);
    const meteo = CityMeteo(props.latitude, props.longitude);

    const handleChange = (e) => {
        e.preventDefault() ;
      }

//  adaugare in baza de date
    const handleSubmitAdd = async(e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/cities`, {
                cache: "no-store",
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({idx, nume, lat, long, foto, nota, comm}),
            });
            if(res.ok) {
                alert("City Added to Favorit");
//              router.push("/");
            } else {
                throw new Error("Failed to add City to Favorit");
            }
        } catch (error) {
            console.log("Error loading City", error);
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between pl-24 pr-24 pt-10">
            <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                <Header title="Display favorit city page" />
            </div>
    
            <div className="poza">
                <img src={image} alt="Nu exista imagine"></img>
            </div>
            <div>
                <table>
                    <caption>Informatii GEOGRAFICE</caption>
                    <tbody>
                    <tr>
                        <th>Denumire</th>
                        <th>Tara</th>
                        <th>Cod tara</th>
                        <th>Latitudine</th>
                        <th>Longitudine</th>
                        <th>Zona</th>
                        <th>Zona</th>
                        <th>Ora locala</th>
                    </tr>
                    <tr>
                        <td>{geo.name}</td>
                        <td>{geo.country}</td>
                        <td>{geo.country_code}</td>
                        <td>{geo.latitude}</td>
                        <td>{geo.longitude}</td>
                        <td>{geo.admin1}</td>
                        <td>{geo.admin2}</td>
                        <td>{geo.timezone}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <table>
                    <caption>Informatii METEO</caption>
                    <tbody>
                    <tr>
                        <th>Data si Ora </th>
                        <th>Temperatura [{meteo.unitTemperatura}]</th>
                        <th>Umiditate [{meteo.unitUmiditate}]</th>
                        <th>Precipitatii [{meteo.unitPrecipitatie}]</th>
                        <th>Presiune [{meteo.unitPresiune}]</th>
                        <th>Viteza vant [{meteo.unitVitezaVant}]</th>
                    </tr>
                    <tr>
                        <td>{meteo.dataOra} {meteo.timeZone}</td>
                        <td>{meteo.temperatura}</td>
                        <td>{meteo.umiditate}</td>
                        <td>{meteo.precipitatie}</td>
                        <td>{meteo.presiune}</td>
                        <td>{meteo.vitezaVant}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <form onSubmit={handleSubmitAdd}>
                    <input type='hidden' onChange={handleChange} />
                    <button type='submit'>Add Favorit</button>
                </form>
            </div>
            <div>
                <Navbar />
            </div>
        </main>
    )
}