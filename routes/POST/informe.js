const express = require("express")
const Router = express.Router()
const controller = require("../../controllers/informe")

Router.post("/postinforme", controller.controller_ep)

module.exports = Router