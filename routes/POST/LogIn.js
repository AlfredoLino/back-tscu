const controller = require("../../controllers/LogIn")
const express = require("express")
const Router = express.Router()

Router.post("/login", controller)

module.exports = Router
