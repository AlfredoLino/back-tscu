const express = require("express")
const Router = express.Router()
const controller = require("../../controllers/GET/getUserById")

module.exports = Router.post("/getUserById", controller)