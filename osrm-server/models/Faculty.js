const mongoose = require("mongoose")
const Schema = mongoose.Schema

const facultySchema = new Schema({
	faculty_name: { type: String, required: true, unique: true, index: true },
	faculty_room: String,
	faculty_block: {
		place_id: Number,
		licence: String,
		osm_type: String,
		osm_id: Number,
		lat: String,
		lon: String,
		class: String,
		type: String,
		place_rank: Number,
		importance: Number,
		addresstype: String,
		name: String,
		display_name: String,
		boundingbox: [String],
	},
})

const Faculty = mongoose.model("Faculty", facultySchema)

module.exports = Faculty
