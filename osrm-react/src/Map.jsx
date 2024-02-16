import { MapContainer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import { useEffect, useState } from "react"
import "leaflet-routing-machine"
import useGeoLocation from "./useGeoLocation"
import Path from "./RoutingMachine"
import useStateStore from "./store"
import Search from "./Search"

const Map = () => {
	const location = useGeoLocation()
	const [routeCoordinates, setRouteCoordinates] = useState([])
	const searchResults = useStateStore((state) => state.searchResults)

	useEffect(() => {
		console.log(searchResults, "searchResults")
	}, [searchResults])

	const fetchRoute = async (start, end) => {
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
							[start[1], start[0]],
							[end[1], end[0]],
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
		fetchRoute([26.84285, 75.56484], [26.84254, 75.56375])
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
			<Search />
			<MapLayers />
			<ZoomControl />
			{routeCoordinates.length > 0 && (
				<Path
					routeCoordinates={routeCoordinates}
					fetchRoute={fetchRoute}
				/>
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

export default Map
