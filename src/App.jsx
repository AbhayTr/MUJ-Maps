import { useEffect } from "react";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import "./App.css";

function RoutingComponent() {
  const map = useMap();

  useEffect(() => {
    let routingControl = L.Routing.control({
      waypoints: [L.latLng(26.84182, 75.56309), L.latLng(26.84276, 75.56469)],
      routeWhileDragging: true,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map]);

  return null;
}

function App() {
  return (
    <MapContainer center={[26.8412, 75.5707]} zoom={19}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RoutingComponent />
    </MapContainer>
  );
}

export default App;
