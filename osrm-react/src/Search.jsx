import { useState, useEffect } from "react"
import { IoIosSearch } from "react-icons/io"
import { useMap } from "react-leaflet"
import { useRef } from "react"
import L from "leaflet"
import { useDebouncedCallback } from "use-debounce"
import classRoom from "./assets/class-room.png"
import facultyRoom from "./assets/meeting-room.png"
import nomatinImage from "./assets/map.png"
import directions from "./assets/directions.png"
import PropTypes from "prop-types"

const Search = ({ handleDirectionsClick }) => {
	const [search, setSearch] = useState("")
	const [searchResults, setSearchResults] = useState([])
	const map = useMap()
	const markersRef = useRef([])
	const searchResultsRef = useRef(null)

	// const setSearchResultsStore = useStateStore(
	// 	(state) => state.setSearchResults
	// )

	const fetchResults = useDebouncedCallback(() => {
		fetch("http://localhost:3000/api/search?q=" + search)
			.then((res) => res.json())
			.then((data) => setSearchResults(data))
	}, 300)

	useEffect(() => {
		if (search.trim() !== "") {
			fetchResults()
		} else {
			setSearchResults([])
		}
	}, [search, fetchResults])

	const handleSearch = (e) => {
		setSearch(e.target.value)
	}

	const handleSearchClick = () => {
		fetchResults()
	}
	const handleResultClick = (result) => {
		if (result.data.lat && result.data.lon) {
			const { lat, lon } = result.data
			// Remove previous markers
			markersRef.current.forEach((marker) => {
				map.removeLayer(marker)
			})
			markersRef.current = []
			// Add new marker
			const marker = L.marker([lat, lon]).addTo(map)
			markersRef.current.push(marker)
			map.setView([lat, lon])
			setSearchResults([])
		}
	}
	const handleScroll = (e) => {
		console.log("scrolling")

		e.stopPropagation()
	}

	return (
		<div
			className="fixed top-4 left-4 z-[401] text-lg bg-white rounded-md "
			onWheel={handleScroll}
		>
			<input
				className="px-6 py-3 text-lg w-[500px] shadow-md  rounded-md outline-none text-gray-600 pr-12"
				type="text"
				value={search}
				onChange={handleSearch}
			/>
			<button
				className="absolute top-4 right-3 text-2xl"
				onClick={handleSearchClick}
			>
				<IoIosSearch />
			</button>
			{searchResults.length > 0 && (
				<ul
					className="mt-2  max-w-[500px] max-h-[400px] overflow-auto z-[402]"
					ref={searchResultsRef}
				>
					{searchResults.map((result, index) => (
						<li
							key={index}
							className="px-4 py-2 cursor-pointer hover:bg-gray-100"
							onClick={() => handleResultClick(result)}
						>
							{result.type === "nominatin" && (
								<div className="flex justify-between items-center gap-4">
									<img
										src={nomatinImage}
										alt=""
										width={40}
										height={40}
									/>
									<span>{result.data.display_name}</span>
									<img
										src={directions}
										alt=""
										width={40}
										height={40}
										onClick={() =>
											handleDirectionsClick(result)
										}
									/>
								</div>
							)}
							{result.type === "faculty" && (
								<div className="flex justify-between items-center gap-4">
									<img
										src={facultyRoom}
										alt=""
										width={40}
										height={40}
									/>
									<span>{result.data.faculty_name}</span>
									<img
										src={directions}
										alt=""
										width={40}
										height={40}
										onClick={() =>
											handleDirectionsClick(result)
										}
									/>
								</div>
							)}
							{result.type === "room" && (
								<div className="flex justify-between items-center gap-4">
									<img
										src={classRoom}
										alt=""
										width={40}
										height={40}
									/>
									<span>{result.data.room_number}</span>
									<img
										src={directions}
										alt=""
										width={40}
										height={40}
										onClick={() =>
											handleDirectionsClick(result)
										}
									/>
								</div>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default Search

Search.propTypes = {
	handleDirectionsClick: PropTypes.func,
}
