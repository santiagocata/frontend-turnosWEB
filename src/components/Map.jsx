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


// -34.603571093235956, -58.38152748633099

const Map = () => {
  const zoomLevel = 20;
  const location = {
    address: "1600 Amphitheatre Parkway, Mountain View, california.",
    lat: -36.6037,
    lng: -58.3820,
  };
  return (
    <iframe 
  width="300" 
  height="170" 
  frameborder="0" 
  scrolling="no" 
  marginheight="0" 
  marginwidth="0" 
  src="https://maps.google.com/maps?q=-34.60357,-58.381529&hl=es&z=14&amp;output=embed"
 >
 </iframe>
  );
};

export default Map;
