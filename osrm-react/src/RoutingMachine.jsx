import { useEffect, useRef } from "react"
import { useMap } from "react-leaflet"
import L from "leaflet"
import PropTypes from "prop-types"

const Path = ({ routeCoordinates = [], fetchRoute }) => {
	const map = useMap()
	const startMarkerRef = useRef(null)
	const endMarkerRef = useRef(null)
	const polylineRef = useRef(null)

	useEffect(() => {
		const polyline = L.polyline(routeCoordinates, {
			color: "red",
		}).addTo(map)
		polylineRef.current = polyline

		const start = routeCoordinates[0]
		const end = routeCoordinates[routeCoordinates.length - 1]
		const newStartMarker = L.marker(start, {
			draggable: true,
		}).addTo(map)
		const newEndMarker = L.marker(end, {
			draggable: true,
		}).addTo(map)

		startMarkerRef.current = newStartMarker
		endMarkerRef.current = newEndMarker

		const updateRoute = () => {
			const startLatLng = newStartMarker.getLatLng()
			const endLatLng = newEndMarker.getLatLng()
			const startCoordinates = [startLatLng.lat, startLatLng.lng]
			const endCoordinates = [endLatLng.lat, endLatLng.lng]
			fetchRoute(startCoordinates, endCoordinates)
		}

		newStartMarker.on("dragend", updateRoute)
		newEndMarker.on("dragend", updateRoute)

		// const bounds = polyline.getBounds()

		map.setView(start, 19)

		return () => {
			map.removeLayer(polylineRef.current)
			newStartMarker.off("dragend", updateRoute)
			newEndMarker.off("dragend", updateRoute)
			map.removeLayer(startMarkerRef.current)
			map.removeLayer(endMarkerRef.current)
		}
	}, [map, routeCoordinates, fetchRoute])

	return null
}

export default Path

Path.propTypes = {
	routeCoordinates: PropTypes.array,
	fetchRoute: PropTypes.func,
}

// function calculateBearing(start, end) {
// 	const startLat = toRadians(start[0])
// 	const startLng = toRadians(start[1])
// 	const endLat = toRadians(end[0])
// 	const endLng = toRadians(end[1])

// 	const dLng = endLng - startLng

// 	const y = Math.sin(dLng) * Math.cos(endLat)
// 	const x =
// 		Math.cos(startLat) * Math.sin(endLat) -
// 		Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLng)

// 	let bearing = Math.atan2(y, x)
// 	bearing = toDegrees(bearing)
// 	bearing = (bearing + 360) % 360 // Normalize to range [0, 360)

// 	return bearing
// }

// // Function to convert degrees to radians
// function toRadians(degrees) {
// 	return (degrees * Math.PI) / 180
// }

// // Function to convert radians to degrees
// function toDegrees(radians) {
// 	return (radians * 180) / Math.PI
// }
