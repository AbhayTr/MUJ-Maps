// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "./App.css"
import "leaflet/dist/leaflet.css"
import Map from "./Map"
import Search from "./Search"

function App() {
	return (
		<div>
			{/* <MapContainer center={[26.8424, 75.56447]} zoom={13}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[26.8424, 75.56447]}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker>
			</MapContainer> */}
			<Search />
			<Map />
		</div>
	)
}

export default App
