import { useState } from "react"
import { IoIosSearch } from "react-icons/io"
const NOMINATION_BASE_URL = "https://nominatim.openstreetmap.org/search?"

// const params = {
// 	q: "",
// 	format: "json",
// 	addressDetails: "addressDetails",
// }
const Search = () => {
	const [search, setSearch] = useState("")
	return (
		<div className="fixed top-4 left-4 z-[401] text-lg bg-white rounded-full ">
			<input
				className="px-6 py-3 text-lg w-[500px] shadow-md rounded-full outline-none text-gray-600 pr-12"
				type="text"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button
				className="absolute top-4 right-3 text-2xl"
				onClick={() => {
					const params = {
						q: search,
						format: "json",
						addressDetails: 1,
						polygon_geojson: 0,
					}
					const queryString = new URLSearchParams(params).toString()
					const requestOptions = {
						method: "GET",
						redirect: "follow",
					}
					fetch(
						`${NOMINATION_BASE_URL}${queryString}`,
						requestOptions
					)
						.then((response) => response.json())
						.then((result) => console.log(result))
						.catch((error) => console.log("error", error))
				}}
			>
				<IoIosSearch />
			</button>
		</div>
	)
}
export default Search
