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

const AllMarker = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [realStates, setRealStates] = useState<any[]>([]);

  async function getStates() {
    const res = await axios
      .get(`http://localhost:4001/items/`)
      .then((res) => setRealStates(res.data));
  }

  useEffect(() => {
    getStates();
  }, []);
  console.log(realStates);

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
        {realStates.map((eachState) => (
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
        ))}
      </MapContainer>
      <div className="flex flex-col w-5/12">
        <h3 className=" font-semibold text-3xl self-center">Buscar en el mapa</h3>
        <div>
            <h4>filtrar por initial</h4>
            <select name="" id="">
                <option value="">1</option>
                <option value="">2</option>
            </select>
        </div>
        <div>
            <h4>filtrar por initial</h4>
            <select name="" id="">
                <option value="">1</option>
                <option value="">2</option>
            </select>
        </div>
        <div>
            <h4>filtrar por initial</h4>
            <select name="" id="">
                <option value="">1</option>
                <option value="">2</option>
            </select>
        </div>
        <div>
            <h4>filtrar por initial</h4>
            <select name="" id="">
                <option value="">1</option>
                <option value="">2</option>
            </select>
        </div>
      </div>
    </div>
  );
};

export default AllMarker;
