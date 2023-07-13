"use client";
import React, { useEffect, useState } from "react";
import {
  TileLayer,
  MapContainer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import marker from "leaflet/dist/images/marker-icon.png";
import axios from "axios";
import Filters from "./Filters";
import Form from "./Form";
import L from "leaflet";
import AddMarker from "./CreateLocation";

export type Estate = {
  _id: string;
  name: string;
  address: string;
  initialInv: number;
  typeInv: string;
  lat: number;
  lng: number;
  bedrooms: string;
  bathrooms: string;
  parking: boolean;
  // tipar con lo que trae el objeto
};

const position = { lat: -33.426666667, lng: -70.583333333333 };
const myIcon = new Icon({
  iconUrl: marker.src,
  iconSize: [20, 32],
});
const icon = L.icon({
  iconSize: [20, 32],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
});

const AllMarker = () => {
  const [selected, setSelected] = useState<any>([]);
  const [latLng, setLatLng] = useState<any[]>([]);
  const [realStates, setRealStates] = useState<Estate[]>([]);
  const [swap, setSwap] = useState(true);

  async function getStates() {
    const res = await axios
      .get(`http://localhost:4001/items/`)
      .then((res) => setRealStates(res.data));
  }

  useEffect(() => {
    getStates();
  }, []);

  function handleActions() {
    swap == true ? setSwap(false) : setSwap(true);
  }

  const handleDeleteById = (event: any) => {
    try {
      axios.delete("http://localhost:4001/items/" + event.currentTarget.id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (event: any) => {
    
  };

  return (
    <div className=" flex flex-row justify-around align-middle m-9">
      <MapContainer
        className=" h-90v w-7/12"
        center={position}
        zoom={11}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AddMarker handleMarkerChange={(value: any) => setLatLng(value)} />
        {/* <MyComponent key={1} /> */}
        {realStates.map((eachState, idx) => (
          <Marker
            key={`marker-${idx}`}
            position={[eachState.lat, eachState.lng]}
            draggable={false}
            icon={myIcon}
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
              <button
                className=" mt-1 p-1 rounded-md bg-cyan-800 text-white border-none"
                id={eachState._id}
                onClick={handleDeleteById}
              >
                Eliminar
              </button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="flex flex-col w-4/12 justify-between">
        {swap == true ? (
          <Form latLng={latLng[0]} />
        ) : (
          <div className="flex flex-col justify-start w-9/12 mt-9 ml-4">
            <h2 className="font-bold border-2 border-cyan-400 max-w-fit self-start p-2">
              Filtrar en el mapa
            </h2>
            <div className="flex flex-col ">
              <div className="flex flex-row my-4 max-h-7 max-w-md overflow-hidden">
                <h4 className="border-2 border-r-0 border-cyan-500">
                  filtrar por inversion inicial
                </h4>
                <select
                  className="border-2 border-l-0 border-cyan-500"
                  name=""
                  id=""
                  onChange={handleFilter}
                >
                  {realStates.map((stated) => (
                    <option value={stated.initialInv}>
                      {stated.initialInv}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row my-4">
                <h4 className="border-2 border-r-0 border-cyan-500">
                  filtrar por cantidad dormitorios
                </h4>
                <select
                  className="border-2 border-l-0 border-cyan-500"
                  name=""
                  id=""
                  onChange={handleFilter}
                >
                  {realStates.map((stated) => (
                    <option value={stated.bedrooms}>{stated.bedrooms}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row my-4">
                <h4 className="border-2 border-r-0 border-cyan-500">filtrar por estacionamiento</h4>
                <select className="border-2 border-l-0 border-cyan-500" name="" id="" onChange={handleFilter}>
                  <option value="true" >Si</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-row justify-around">
          <button
            onClick={handleActions}
            className={
              swap == false
                ? "mt-4 border-2 border-cyan-500 max-w-fit p-2"
                : "mt-4 border-2 border-cyan-100 max-w-fit p-2 text-opacity-10"
            }
            disabled={swap}
            type="submit"
          >
            Formulario
            <br /> de proyecto
          </button>
          <button
            onClick={handleActions}
            disabled={!swap}
            className={
              swap == true
                ? "mt-4 border-2 border-cyan-500 max-w-fit p-2"
                : "mt-4 border-2 border-cyan-100 max-w-fit p-2 text-opacity-10"
            }
          >
            Buscar proyectos
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllMarker;
