const mongoose = require("mongoose")
const Schema = mongoose.Schema

const roomSchema = new Schema({
	room_number: String,
	building: String,
	corridor_location: {
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

roomSchema.index({ room_number: 1, building: 1 }, { unique: true })

const Room = mongoose.model("Room", roomSchema)

module.exports = Room
