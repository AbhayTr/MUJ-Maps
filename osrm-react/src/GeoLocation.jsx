import { useEffect } from "react"
import useStateStore from "./store"
const GeoLocation = () => {
	const { setLocation } = useStateStore()

	const onSuccess = (location) => {
		setLocation({
			loaded: true,
			coordinates: {
				lat: location.coords.latitude,
				lng: location.coords.longitude,
			},
		})
	}

	const onError = (error) => {
		setLocation({
			loaded: true,
			error,
		})
	}

	useEffect(() => {
		if (!(navigator && navigator.geolocation)) {
			onError({
				code: 0,
				message: "Geolocation is not supported",
			})
		}

		navigator.geolocation.getCurrentPosition(onSuccess, onError)
	}, [])

	return <></>
}
export default GeoLocation
