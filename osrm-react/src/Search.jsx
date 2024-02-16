import { useState, useEffect } from "react"
import { IoIosSearch } from "react-icons/io"
// import useStateStore from "./store"
import debounce from "lodash/debounce"
import { useMap } from "react-leaflet"
import { useRef } from "react"
import L from "leaflet"
import { useDebounce, useDebouncedCallback } from "use-debounce"

const Search = () => {
	const [search, setSearch] = useState("")
	const [searchResults, setSearchResults] = useState([])
	const map = useMap()
	const markersRef = useRef([])
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
	}, [search])

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

	return (
		<div className="fixed top-4 left-4 z-[401] text-lg bg-white rounded-full ">
			<input
				className="px-6 py-3 text-lg w-[500px] shadow-md rounded-full outline-none text-gray-600 pr-12"
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
				<ul className="mt-2 bg-white shadow-md rounded-md">
					{searchResults.map((result, index) => (
						<li
							key={index}
							className="px-4 py-2 cursor-pointer hover:bg-gray-100"
							onClick={() => handleResultClick(result)}
						>
							{result.type === "nominatin" && (
								<span>{result.data.display_name}</span>
							)}
							{result.type === "faculty" && (
								<span>{result.data.faculty_name}</span>
							)}
							{result.type === "room" && (
								<span>{result.data.room_number}</span>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default Search
