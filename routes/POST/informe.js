const express = require("express")
const Router = express.Router()
const controller = require("../../controllers/informe")

Router.post("/postinforme", controller)

module.exports = Router