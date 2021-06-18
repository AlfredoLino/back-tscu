const express = require("express")
const Router = express.Router()

const controller_post = require("../../controllers/sensordata")
const controller_get = require("../../controllers/GET/sensordata")
Router.post("/sensor", controller_post)
Router.get("/sensor", controller_get)
Router.get("/wsensor", require("../../controllers/GET/wsensordata"))
module.exports = Router