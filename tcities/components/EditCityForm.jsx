"use client";

import '/app/globals.css' ;
import CityFoto from "@/components/CityFoto" ;
import CityMeteo from "@/components/CityMeteo" ;
import CityGeo from   "@/components/CityGeo" ;
import React, { Component, useState, useEffect } from 'react' ;
import { useRouter } from "next/navigation";

function Header({ title }) {
    return <h1>{title ? title : 'Default title'}</h1>;
}

export default function EditCityForm( { id, city } ) {

    const [idx, setIdx] = useState(city.cities.idx);
    const [nume, setNume] = useState(city.cities.nume);
    const [lat, setLat] = useState(city.cities.lat);
    const [long, setLong] = useState(city.cities.long);
    const [foto, setFoto] = useState(city.cities.foto);
    const [nota, setNota] = useState(city.cities.nota);
    const [comm, setComm] = useState(city.cities.comm);
    const [newIdx, setNewIdx] = useState(city.cities.idx);
    const [newNume, setNewNume] = useState(city.cities.nume);
    const [newLat, setNewLat] = useState(city.cities.lat);
    const [newLong, setNewLong] = useState(city.cities.long);
    const [newFoto, setNewFoto] = useState(city.cities.foto);
    const [newNota, setNewNota] = useState(city.cities.nota);
    const [newComm, setNewComm] = useState(city.cities.comm);

    const router = useRouter();

    const image = CityFoto(city.cities.nume);
    const geo = CityGeo(city.cities.idx);
    const meteo = CityMeteo(city.cities.lat, city.cities.long);

    const handleChange = (e) => {
        e.preventDefault() ;
      }

//  modificare in baza de date
    const handleSubmitUpd = async(e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/cities/${id}`, {
                cache: "no-store",
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({newIdx, newNume, newLat, newLong, newFoto, newNota, newComm}),
            });
            if(res.ok) {
                alert("City UpDated from Favorit");
                router.refresh();
//              router.push("/");
            } else {
                throw new Error("Failed to update City from Favorit");
            }
        } catch (error) {
            console.log(error);
        }
    }

//  stergere din baza de date
    const handleSubmitDel = async (e) => {
        e.preventDefault()
        const confirmed = confirm("Are you sure ?") ;
        if (confirmed) {
            const res = await fetch(`http://localhost:3000/api/cities?id=${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                alert ("City Deleted from Favorit");
                router.push("/");
            }
            else {
                alert ("Failed to delete City from Favorit");
            }
        }
    }

    const handleNota = (e) => {
        e.preventDefault()
        alert("Nota si Comentariu au fost validate");
    }

    return (
        <main className="flex max-h-screen flex-col items-center justify-between pl-24 pr-24 pt-10">
            <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
                <Header title="Display favorit city page" />
            </div>
    
            <div className="poza">
                <img src={image} alt="Nu exista imagine"></img>
            </div>
            <div className="xtable">
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
            <div className="xtable">
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

            <div className="comm">
                <form onSubmit={handleNota}>
                    <div>
                        <textarea className="inline" id="xcom" placeholder="Comentariu" name="comm" maxLength="100" required onChange={(e) => setNewComm(e.target.value)} defaultValue={city.cities.comm} />
                        <label htmlFor="xcom"> &#129094; Comentariu ( maxim 100 caractere )</label>
                    </div>
                    <div className="flex justify-between gap-5 items-start">
                        <div className="nota">
                            <input type="radio" className="inline" id="r1" name="nota" value="1" required onChange={(e) => setNewNota(e.target.value)} checked={newNota === "1"} />
                            <label htmlFor="r1">&#129094; Nota 1 ; </label>
                            <input type="radio" className="inline" id="r2" name="nota" value="2" required onChange={(e) => setNewNota(e.target.value)} checked={newNota === "2"} />
                            <label htmlFor="r2">&#129094; Nota 2 ; </label>
                            <input type="radio" className="inline" id="r3" name="nota" value="3" required onChange={(e) => setNewNota(e.target.value)} checked={newNota === "3"} />
                            <label htmlFor="r3">&#129094; Nota 3 ; </label>
                            <input type="radio" className="inline" id="r4" name="nota" value="4" required onChange={(e) => setNewNota(e.target.value)} checked={newNota === "4"} />
                            <label htmlFor="r4">&#129094; Nota 4 ; </label>
                            <input type="radio" className="inline" id="r5" name="nota" value="5" required onChange={(e) => setNewNota(e.target.value)} checked={newNota === "5"} />
                            <label htmlFor="r5">&#129094; Nota 5 ; </label>
                        </div>
                        <div className="flex">
                            <input type="submit" value="Votează nota" />
                        </div>
                    </div>
                </form>
            </div>
            <div>
                <form onSubmit={handleSubmitUpd}>
                    <input type='hidden' onChange={handleChange} value={id} />
                    <button type='submit'>Update Favorit</button>
                </form>
                <form onSubmit={handleSubmitDel}>
                    <input type='hidden' onChange={handleChange} value={id} />
                    <button type='submit'>Del Favorit</button>
                </form>
            </div>
        </main>
    )
}