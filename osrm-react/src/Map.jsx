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
				profile: "car",
				points: [
					[26.84293, 75.56543],
					[26.84352, 75.56654],
				],
				// point_hint: "string",
				// snap_prevention: "string",
				// curbside: "any",
				// locale: "en",
				// elevation: "false",
				// details: "string",
				// optimize: "false",
				// instructions: "true",
				// calc_points: "true",
				// debug: "false",
				// points_encoded: "true",
				// "ch.disable": "false",
				// heading: "0",
				// heading_penalty: "120",
				// pass_through: "false",
				// algorithm: "round_trip",
				// "round_trip.distance": "10000",
				// "round_trip.seed": "0",
				// "alternative_route.max_paths": "2",
				// "alternative_route.max_weight_factor": "1.4",
				// "alternative_route.max_share_factor": "0.6",
				key: "bd5303e6-c8a7-4fc8-a73d-d65ce9851c11",
			}).toString()

			const resp = await fetch(
				`https://graphhopper.com/api/1/route?${query}`,
				{ method: "GET" }
			)

			const data = await resp.text()
			console.log(data)
			// const data = await response.json()
			const { paths } = data
			if (paths && paths.length > 0) {
				const { points } = paths[0]
				setRouteCoordinates(points)
			}
		} catch (error) {
			console.error("Error fetching route:", error)
		}
	}

	useEffect(() => {
		fetchRoute()
	}, [])

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

const Path = ({ routeCoordinates }) => {
	const map = useMap()

	useEffect(() => {
		const polyline = L.polyline(routeCoordinates, { color: "red" }).addTo(
			map
		)
		map.fitBounds(polyline.getBounds())
		return () => {
			map.removeLayer(polyline)
		}
	}, [map, routeCoordinates])

	return null
}

export default Map
