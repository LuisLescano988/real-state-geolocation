"use client";
import React, { useEffect, useState } from "react";
import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import marker from "leaflet/dist/images/marker-icon.png";
import axios from "axios";
// import {getStates} from "./states"

const position = { lat: -33.426666667, lng: -70.583333333333 };
const myIcon = new Icon({
  iconUrl: marker.src,
  iconSize: [20, 32],
});


// const [input, setInput] = useState({
  //   name: "",
  //   address: "",
  //   initialInv: "",
  //   typeInv:"",
  //   lat:"",
  //   lng:"",
  //   bedrooms:"",
  //   bathrooms:"",
  //   parking:false
  // });
  
  // function formHandler() {
    //   setActive(true)
// }

const MapView = () => {

  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [realStates, setRealStates] = useState<any[]>([]);

  async function getStates() {
    const res = await axios.get(`http://localhost:4001/items/`).then((res)=> setRealStates(res.data));    
  } 

  useEffect(() => {
    getStates();
  }, []);
  console.log(realStates)


  return (
    <div className=" flex flex-row justify-around align-middle m-9">
      <MapContainer
        className=" h-90v w-5/12"
        center={position}
        zoom={15}
        scrollWheelZoom={true}        
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {realStates.map(eachState=>(
          <Marker           
          position={[eachState.lat, eachState.lng]} 
          draggable={true} 
          icon={myIcon}
          // eventHandlers={eventHandlers}
          // ref={markerRef} 
          >
            <Popup>
              <p className=" w-fit">
                {eachState.name}
                <br />
                inversion <br />
                inicial U$D {eachState.initialInv}
              </p>
              <img
                className=" w-32 h-30"
                src="https://cdn.pixabay.com/photo/2017/01/31/17/27/architecture-2025743_640.png"
                alt=""
              />
              <button className=" mt-1 p-1 rounded-md bg-cyan-800 text-white border-none">
                Editar
              </button>
            </Popup>
          </Marker>
        ))
        }
      </MapContainer>
      <form
        className="flex flex-col justify-center w-5/12 align-middle"
        action=""
      >
        <h3 className="mt- font-bold border-2 border-cyan-400 max-w-fit self-center p-2 rounded-md">
          Completar para crear un proyecto
        </h3>
        <input
          className="border-b-2 border-l-2 border-cyan-600 m-4"
          type="text"
          placeholder="Escriba el nombre del proyecto"
        />
        <input
          className="border-b-2 border-l-2 border-cyan-600 m-4"
          type="text"
          placeholder="Escriba la direccion del proyecto"
        />
        <input
          className="border-b-2 border-l-2 border-cyan-600 m-4"
          type="text"
          placeholder="Indique cual es la inversion inicial"
        />
        <input
          className="border-b-2 border-l-2 border-cyan-600 m-4"
          type="text"
          placeholder="Escoga Pronta entrega o Entrega futura"
        />
        <input
          className="border-b-2 border-l-2 border-cyan-600 m-4"
          type="text"
          placeholder="Indique cantidad de dormitorios"
        />
        <input
          className="border-b-2 border-l-2 border-cyan-600 m-4"
          type="text"
          placeholder="Indique cantidad de baños"
        />
        <input
          className="border-b-2 border-l-2 border-cyan-600 m-4"
          type="text"
          placeholder="Indique si cuenta con estacionamiento"
        />
        <div className="flex flex-row justify-around">
          <button
            className="mt-4 border-2 border-cyan-500 max-w-fit p-2 "
            type="submit"
          >
            Crear proyecto
          </button>
          <button className="mt-4 border-2 border-cyan-500 max-w-fit p-2 ">
            Buscar proyectos
          </button>
        </div>
      </form>
    </div>
  );
};

export default MapView;
