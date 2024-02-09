import L from "leaflet"
import { createControlComponent } from "@react-leaflet/core"
import "leaflet-routing-machine"

const createRoutineMachineLayer = () => {
	const instance = L.Routing.control({
		waypoints: [L.latLng(26.8466, 75.5689), L.latLng(26.83462, 75.56373)],
		router: L.Routing.osrmv1({ profile: "foot" }),
		// geocoder: L),
		routeWhileDragging: true,
	})

	console.log(instance)

	return instance
}

const RoutingMachine = createControlComponent(createRoutineMachineLayer)

export default RoutingMachine
