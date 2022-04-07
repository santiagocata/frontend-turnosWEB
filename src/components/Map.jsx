import React from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/map-marker";

const LocationPin = () => (
  <div>
    <Icon icon={locationIcon} style={{ fontSize: '80px' }}/>
    <p style={{ fontSize: '30px' }}>SUCURSAL</p>
  </div>
);

// -34.6037123877597, -58.382074656939444

const Map = () => {
  const zoomLevel = 20;
  const location = {
    address: "1600 Amphitheatre Parkway, Mountain View, california.",
    lat: -36.6037,
    lng: -58.3820,
  };
  return (
    <div style={{ height: "50vh", width: "50%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBfDTDBgoklx7Q1VwUL9_WxJzc69I6BNhI" }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
        <LocationPin />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
