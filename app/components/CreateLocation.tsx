
import { Icon } from "leaflet";
import marker from "leaflet/dist/images/marker-icon.png";
import { useEffect, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

const myIcon = new Icon({
    iconUrl: marker.src,
    iconSize: [20, 32],
  });

type AddMarkerProps = {
    handleMarkerChange: (value: any) => void
}

export default function AddMarker({handleMarkerChange}: AddMarkerProps) {
  const [coord, setPosition] = useState<any>([]);

  useMapEvents({
    click: (e) => {
      setPosition([ e.latlng]);
    }
  });

  useEffect(() => {
    // console.log(coord);
    handleMarkerChange(coord)  }, [coord]);

  const removeMarker = (pos:any) => {
    setPosition((prevCoord:any) =>
      prevCoord.filter((coord:any) => JSON.stringify(coord) !== JSON.stringify(pos))
    );
  };
  

  return (
    <div>
      {coord.map((pos:any, idx:any) => (
        <Marker
          key={`marker-${idx}`}
          position={pos}
          icon={myIcon}
          draggable={true}
          eventHandlers={{
            click: (e) => {
              console.log(e.latlng);
            }
          }}
        >
          <Popup>
            <button onClick={() => removeMarker(pos)}>Remove marker</button>
          </Popup>
        </Marker>
      ))}
    </div>
  );
}