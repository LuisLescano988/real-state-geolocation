"use client";
import React, { useEffect, useState } from "react";
import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import { Icon, latLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import marker from "leaflet/dist/images/marker-icon.png";
import { ChangeEvent } from "react";
import axios from "axios";

// import {getStates} from "./states"

const position = { lat: -33.426666667, lng: -70.583333333333 };
const myIcon = new Icon({
  iconUrl: marker.src,
  iconSize: [20, 32],
});

type FormProps = {
  latLng: any;
}

const Form = ({ latLng }: FormProps) => {
  const [formValues, setFormValues] = useState({
    name: "",
    initialInv: "",
    typeInv: "Pronta entrega",
    lat: "",
    lng: "",
    bedrooms: "",
    bathrooms: "",
    parking: "false"
  });

  const handleSubmit = () => {
    try {
            axios.post('https://state-server.onrender.com/items/', formValues, {method:"post"})
      // axios({
      //   method: 'post',
      //   url: 'https://state-server.onrender.com/items/',
      //   data: formValues
      // })
    } catch (error) {
      console.log(error)
    }
  }


  const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setFormValues(
      {
        ...formValues,
        [event.target.name]: event.target.value
      }
    )
  }

  useEffect(() => {
    if (latLng) {
      setFormValues({
        ...formValues,
        lat: latLng.lat,
        lng: latLng.lng
      })
    }
  }, [latLng])



  return (
    <div className=" flex flex-row justify-start align-middle mt-9">
      <form
        className="flex flex-col justify-center w-9/12"
        onSubmit={handleSubmit}
      >
        <h3 className="ml-4 font-bold border-2 border-cyan-400 max-w-fit p-2">
          Completar para crear un proyecto
        </h3>
        <input
          className="border-b-2 border-l-2 border-cyan-600 m-4"
          type="text"
          placeholder="Escriba el nombre del proyecto"
          name="name"
          onChange={handleInputChange}
          value={formValues['name']}
        />
        <input
          className="border-b-2 border-l-2 border-cyan-600 m-4"
          type="number"
          placeholder="Indique cual es la inversion inicial"
          name="initialInv"
          onChange={handleInputChange}
          value={formValues['initialInv']}
        />
        <select
          className="border-b-2 border-l-2 border-cyan-600 m-4"
          placeholder="Escoga Pronta entrega o Entrega futura"
          name="typeInv"
          onChange={handleInputChange}
          value={formValues["typeInv"]}

        >
          <option value="Pronta entrega">Pronta entrega</option>
          <option value="Entrega futura">Entrega futura</option>
        </select>
        <input
          className="border-b-2 border-l-2 border-cyan-600 m-4"
          type="number"
          placeholder="Indique cantidad de dormitorios"
          name="bedrooms"
          onChange={handleInputChange}
          value={formValues["bedrooms"]}

        />
        <input
          className="border-b-2 border-l-2 border-cyan-600 m-4"
          type="number"
          placeholder="Indique cantidad de baños"
          name="bathrooms"
          onChange={handleInputChange}
          value={formValues["bathrooms"]}

        />
        <select
          className="border-b-2 border-l-2 border-cyan-600 m-4"
          placeholder="Indique si cuenta con estacionamiento"
          name="parking"
          onChange={handleInputChange}
          value={formValues["parking"]}
        >
          <option value="true">Cuenta con estacionamiento</option>
          <option value="false">No cuenta con estacionamiento</option>
        </select>
        <button type="submit" className="mt-4 self-center border-2 border-cyan-300 bg-cyan-50 max-w-fit p-1" hidden={!latLng || !formValues.name || !formValues.bathrooms ? true : false}>Crear proyecto</button>
      </form>
    </div>
  );
};

export default Form;
