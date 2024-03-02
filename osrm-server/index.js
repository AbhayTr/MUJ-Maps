const express = require("express")
const app = express()
const port = 3000
const cors = require("cors")
const mongoose = require("mongoose")
const indexRoute = require("./routes/index.route")

app.use(cors())
app.use(express.static("statics"))
app.use("/api", indexRoute)

const mongoURI = "mongodb://127.0.0.1:27017/campus-maps"

// Connect to MongoDB
mongoose
	.connect(mongoURI)
	.then(() => {
		console.log("MongoDB connected")
	})
	.catch((err) => {
		console.error("MongoDB connection error:", err)
	})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})

const facultyMapping = {
	faculty_name: "name",
	faculty_room: "room",
	faculty_block: {
		place_id: 380774604,
		licence:
			"Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
		osm_type: "node",
		osm_id: 11584491458,
		lat: "26.8436736",
		lon: "75.5665029",
		class: "office",
		type: "yes",
		place_rank: 30,
		importance: 0.00000999999999995449,
		addresstype: "office",
		name: "Faculty Block 6",
		display_name:
			"Faculty Block 6, 3rd floor, AB2 footpath, Dahmi Kalan, Sanganer Tehsil, Jaipur District, Rajasthan, 303007, India",
		boundingbox: ["26.8436236", "26.8437236", "75.5664529", "75.5665529"],
	},
}

const response = {
	type: "faculty" || "room" || "nominatin",
	data: "",
}
const output = [
	{
		place_id: 244151014,
		licence:
			"Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
		osm_type: "way",
		osm_id: 1158554635,
		lat: "26.8423537",
		lon: "75.56176434143072",
		class: "amenity",
		type: "university",
		place_rank: 30,
		importance: 0.27524463272973926,
		addresstype: "amenity",
		name: "Manipal University Jaipur",
		display_name:
			"Manipal University Jaipur, Jogging Track, Dahmi Kalan, Sanganer Tehsil, Jaipur District, Rajasthan, 303007, India",
		boundingbox: ["26.8383207", "26.8463506", "75.5593205", "75.5647705"],
	},
	{
		place_id: 245590637,
		licence:
			"Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
		osm_type: "way",
		osm_id: 1124224198,
		lat: "26.8455115",
		lon: "75.56417534952837",
		class: "leisure",
		type: "pitch",
		place_rank: 30,
		importance: 0.00000999999999995449,
		addresstype: "leisure",
		name: "Manipal University Cricket Ground",
		display_name:
			"Manipal University Cricket Ground, Basketball Path, Dahmi Kalan, Sanganer Tehsil, Jaipur District, Rajasthan, 303007, India",
		boundingbox: ["26.8448038", "26.8462193", "75.5633880", "75.5649627"],
	},
	{
		place_id: 244529590,
		licence:
			"Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
		osm_type: "way",
		osm_id: 1141643446,
		lat: "26.845820500000002",
		lon: "75.56543335",
		class: "leisure",
		type: "pitch",
		place_rank: 30,
		importance: 0.00000999999999995449,
		addresstype: "leisure",
		name: "Manipal University Tennis Court",
		display_name:
			"Manipal University Tennis Court, Basketball Path, Dahmi Kalan, Sanganer Tehsil, Jaipur District, Rajasthan, 303007, India",
		boundingbox: ["26.8456092", "26.8460318", "75.5650177", "75.5658490"],
	},
	{
		place_id: 245522250,
		licence:
			"Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
		osm_type: "way",
		osm_id: 1158522861,
		lat: "26.8417527",
		lon: "75.56609423738593",
		class: "office",
		type: "educational_institution",
		place_rank: 30,
		importance: 0.00000999999999995449,
		addresstype: "office",
		name: "Administrative Block Manipal University Jaipur",
		display_name:
			"Administrative Block Manipal University Jaipur, MUJ Campus road, Dahmi Kalan, Sanganer Tehsil, Jaipur District, Rajasthan, 303007, India",
		boundingbox: ["26.8413363", "26.8421631", "75.5650026", "75.5667735"],
	},
	{
		place_id: 243954946,
		licence:
			"Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
		osm_type: "way",
		osm_id: 1141643447,
		lat: "26.8462294",
		lon: "75.565259",
		class: "leisure",
		type: "pitch",
		place_rank: 30,
		importance: 0.00000999999999995449,
		addresstype: "leisure",
		name: "Manipal University Basketball Court",
		display_name:
			"Manipal University Basketball Court, Basketball Path, Dahmi Kalan, Sanganer Tehsil, Jaipur District, Rajasthan, 303007, India",
		boundingbox: ["26.8460678", "26.8463910", "75.5648320", "75.5656860"],
	},
	{
		place_id: 245651511,
		licence:
			"Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
		osm_type: "node",
		osm_id: 10778197183,
		lat: "26.8417676",
		lon: "75.5647306",
		class: "tourism",
		type: "viewpoint",
		place_rank: 30,
		importance: 0.00000999999999995449,
		addresstype: "tourism",
		name: "I <3 Manipal Selfie point",
		display_name:
			"I <3 Manipal Selfie point, MUJ Campus road, Dahmi Kalan, Sanganer Tehsil, Jaipur District, Rajasthan, 303007, India",
		boundingbox: ["26.8417176", "26.8418176", "75.5646806", "75.5647806"],
	},
]
