const express = require("express")

const router = express.Router()
const searchRoute = require("./search.route.js")

router.use("/search", searchRoute)

module.exports = router
