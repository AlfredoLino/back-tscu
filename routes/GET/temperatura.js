const express = require("express")
const Router = express.Router()
const controller = require("../../controllers/GET/temperatura")

Router.get("/temp", controller)

module.exports = Router