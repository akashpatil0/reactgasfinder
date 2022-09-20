import React from "react";
import GoogleMapReact from "google-map-react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useState } from "react";
import LocationMarker from "./LocationMarker";

const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  locations,
  setMouseDrag,
}) => {
  const [selectedMarker, setMarker] = useState([]);

  const markers = locations?.map((loc, i) => {
    return (
      <LocationMarker
        lat={loc.lat}
        lng={loc.lng}
        key={i}
        selectedMarker={selectedMarker}
        setMarker={setMarker}
      />
    );
  });

  return (
    <div className="mapContainer">
      <GoogleMapReact
        options={{ gestureHandling: "greedy" }}
        bootstrapURLKeys={{ key: "AIzaSyAFRCODy2Hbk63kYVSemmcz0DIg3S-XZz8" }}
        defaultCenter={{ lat: 27.6648, lng: -81.5158 }}
        center={coordinates}
        defaultZoom={13}
        margin={[50, 50, 50, 50]}
        onChange={(e) => {
          setCoordinates({
            lat: e.center.lat,
            lng: e.center.lng,
          });
          setBounds({
            ne: e.marginBounds.ne,
            sw: e.marginBounds.sw,
          });
        }}
        onChildClick={(child) => {
          setMarker(locations[Number(child)]);
        }}
        onDragEnd={() => {
          setMouseDrag(true);
        }}
      >
        {selectedMarker.length === 0 ? (
          <></>
        ) : (
          <div
            className="markerContainer"
            lat={selectedMarker.lat}
            lng={selectedMarker.lng}
          >
            <h3>{selectedMarker.name}</h3>
            <AiOutlineCloseCircle
              className="infoboxExit"
              onClick={() => {
                setMarker([]);
              }}
            />
            <h3>${selectedMarker.price}</h3>
            <h3>{selectedMarker.location}</h3>
          </div>
        )}
        {markers}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
