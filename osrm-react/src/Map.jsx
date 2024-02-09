// import { MapContainer, Marker, Popup, useMap } from "react-leaflet"
// import L from "leaflet"
// import RoutingMachine from "./RoutingMachine.jsx"
// import useGeoLocation from "./useGeoLocation"
// import { useEffect } from "react"
// import "lrm-graphhopper"

// console.log(L)

// const Map = () => {
// 	// const map = useMap()
// 	const location = useGeoLocation()

// 	const ZoomControl = () => {
// 		const map = useMap()

// 		useEffect(() => {
// 			const layerControl = L.control.zoom({
// 				position: "bottomright",
// 			})
// 			layerControl.addTo(map)

// 			return () => {
// 				// Cleanup if needed
// 				map.removeControl(layerControl)
// 			}
// 		}, [map])

// 		return null
// 	}

// 	const MapLayers = () => {
// 		const map = useMap()
// 		useEffect(() => {
// 			console.log("map", map)
// 			L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
// 				maxZoom: 20,
// 				attribution:
// 					'&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
// 			}).addTo(map)
// 		}, [map])
// 	}
// 	const RouteControl = () => {
// 		const map = useMap()
// 		useEffect(() => {
// 			const routeControl = new L.Routing.Control({
// 				waypoints: [
// 					L.latLng(26.84293, 75.56543),
// 					L.latLng(26.84352, 75.56654),
// 				],
// 				show: false,
// 				routeWhileDragging: true,
// 				router: new L.Routing.graphHopper(
// 					"bd5303e6-c8a7-4fc8-a73d-d65ce9851c11",
// 					{
// 						profile: "foot",
// 					}
// 				),
// 			}).addTo(map)
// 		}, [map])
// 	}

// 	return (
// 		<MapContainer
// 			center={[26.8424, 75.56447]}
// 			zoom={13}
// 			maxZoom={20}
// 			zoomControl={false}
// 		>
// 			{location.loaded && !location.error && (
// 				<Marker
// 					position={[
// 						location.coordinates.lat,
// 						location.coordinates.lng,
// 					]}
// 				>
// 					<Popup>You are here</Popup>
// 				</Marker>
// 			)}
// 			<MapLayers />
// 			<ZoomControl />
// 			<RouteControl />
// 			{/* <RoutingMachine /> */}
// 		</MapContainer>
// 	)
// }

// export default Map

import { MapContainer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import { useEffect, useState } from "react"
import "leaflet-routing-machine"
import useGeoLocation from "./useGeoLocation"

const Map = () => {
	const location = useGeoLocation()
	const [routeCoordinates, setRouteCoordinates] = useState([])

	const fetchRoute = async () => {
		try {
			const query = new URLSearchParams({
				key: "bd5303e6-c8a7-4fc8-a73d-d65ce9851c11",
			}).toString()

			const resp = await fetch(
				`https://graphhopper.com/api/1/route?${query}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						points: [
							[75.56484, 26.84285],
							[75.56375, 26.84254],
						],
						point_hints: [
							"Manipal University Jaipur, Jaipur, Rajasthan, India",
							"Manipal University Jaipur, Jaipur, Rajasthan, India",
						],
						snap_preventions: ["motorway", "ferry", "tunnel"],
						details: ["road_class", "surface"],
						profile: "foot",
						locale: "en",
						instructions: true,
						calc_points: true,
						points_encoded: false,
					}),
				}
			)

			const data = await resp.json()
			// console.log(data)

			const { paths } = data
			if (paths && paths.length > 0) {
				const { coordinates } = paths[0].points

				const swappedCoordinates = coordinates.map((coord) => [
					coord[1],
					coord[0],
				])

				console.log(swappedCoordinates)
				setRouteCoordinates(swappedCoordinates)
			}
		} catch (error) {
			console.error("Error fetching route:", error)
		}
	}

	useEffect(() => {
		fetchRoute()
	}, [])

	// console.log(routeCoordinates)

	return (
		<MapContainer
			center={[26.8424, 75.56447]}
			zoom={13}
			maxZoom={20}
			zoomControl={false}
		>
			{location.loaded && !location.error && (
				<Marker
					position={[
						location.coordinates.lat,
						location.coordinates.lng,
					]}
				>
					<Popup>You are here</Popup>
				</Marker>
			)}
			<MapLayers />
			<ZoomControl />
			{routeCoordinates.length > 0 && (
				<Path routeCoordinates={routeCoordinates} />
			)}
		</MapContainer>
	)
}

const MapLayers = () => {
	const map = useMap()
	useEffect(() => {
		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 20,
			attribution:
				'&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
		}).addTo(map)
	}, [map])
	return null
}

const ZoomControl = () => {
	const map = useMap()
	useEffect(() => {
		const layerControl = L.control.zoom({
			position: "bottomright",
		})
		layerControl.addTo(map)
		return () => {
			map.removeControl(layerControl)
		}
	}, [map])
	return null
}

const Path = ({ routeCoordinates = [] }) => {
	const map = useMap()

	useEffect(() => {
		// console.log(routeCoordinates.slice(-1))

		const polyline = L.polyline(routeCoordinates, {
			color: "red",
		}).addTo(map)
		const startMarker = L.marker(routeCoordinates[0]).addTo(map)
		const endMarker = L.marker(
			routeCoordinates[routeCoordinates.length - 1]
		).addTo(map)
		setTimeout(() => {
			map.fitBounds(polyline.getBounds())
			map.zoomOut(1, { animate: true })
		}, 100) // Adjust the delay time as needed

		return () => {
			map.removeLayer(polyline)
		}
	}, [map, routeCoordinates])

	return null
}

export default Map
