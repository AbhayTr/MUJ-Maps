const express = require("express")
const router = express.Router()

const { getSearchResults } = require("../controllers/search.controller")

router.get("/", getSearchResults)

module.exports = router
