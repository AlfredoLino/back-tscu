const express = require('express')
const Router = express.Router()
const controller = require('../../controllers/SignIn')

Router.post("/signin", controller)

module.exports = Router