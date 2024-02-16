const axios = require("axios")
const Faculty = require("../models/Faculty")
const Room = require("../models/Room")
const NOMINATION_BASE_URL = "https://nominatim.openstreetmap.org/search?"

const getNominatinResults = async (q) => {
	try {
		const params = {
			q,
			format: "json",
			addressDetails: 1,
			polygon_geojson: 0,
			viewbox: "75.54474,26.84889,75.58886,26.83633",
			bounded: 1,
		}
		const queryString = new URLSearchParams(params).toString()
		const response = await axios.get(`${NOMINATION_BASE_URL}${queryString}`)
		const data = response.data.map((d) => {
			return {
				type: "nominatin",
				data: d,
			}
		})
		return data
	} catch (err) {
		console.error("Error fetching Nominatin results:", err)
		return []
	}
}

const getFacultyResults = async (q) => {
	try {
		// Assuming Faculty model has a 'name' field to match against the query
		const faculties = await Faculty.find({
			name: { $regex: new RegExp(q, "i") },
		})
		return faculties.map((faculty) => ({
			type: "faculty",
			data: faculty,
		}))
	} catch (err) {
		console.error("Error fetching faculty results:", err)
		return []
	}
}

const getRoomResults = async (q) => {
	try {
		let rooms = []
		const numberRegex = /\d+/g
		const matches = q.match(numberRegex)
		if (matches) {
			for (const match of matches) {
				const room = await Room.findOne({ roomNumber: match })
				if (room) {
					rooms.push({
						type: "room",
						data: room,
					})
				}
			}
		} else {
			// Assuming Room model has a 'roomNumber' field to match against the query
			rooms = await Room.find({
				roomNumber: { $regex: new RegExp(q, "i") },
			})
			rooms = rooms.map((room) => ({
				type: "room",
				data: room,
			}))
		}
		return rooms
	} catch (err) {
		console.error("Error fetching room results:", err)
		return []
	}
}

const getSearchResults = async (req, res) => {
	const { q } = req.query

	const nominatinResponse = getNominatinResults(q)
	const facultyResponse = getFacultyResults(q)
	const roomResponse = getRoomResults(q)

	const results = [...nominatinResponse, ...facultyResponse, ...roomResponse]

	return res.status(200).json(results)
}

module.exports = { getSearchResults }
