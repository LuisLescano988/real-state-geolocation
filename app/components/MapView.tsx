"use client";
import React from "react";
import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import L from "leaflet"
import "leaflet/dist/leaflet.css";
import marker from "leaflet/dist/images/marker-icon.png";

const position = { lat: -27.783357, lng: -64.264167 };
const myIcon = new Icon({
  iconUrl: marker.src,
  iconSize: [20, 32],
});
const MapView = () => {
  return (
    <div>
      <MapContainer
        className=" place-items-start mt-10 ml-7 h-90v w-1/2"
        center={position}
        zoom={14}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} draggable={true} icon={myIcon}>
          <Popup>
            <p className=" w-fit">
              Titulo del proyecto
              <br />
              inversion <br />
              inicial U$D 25000
            </p>
            <img
              className=" w-32 h-30"
              src="https://cdn.pixabay.com/photo/2017/01/31/17/27/architecture-2025743_640.png"
              alt=""
            />
            <button className=" mt-1 p-1 rounded-md bg-cyan-800 text-white border-none">Crear</button>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
