const controller = require("../../controllers/GET/getInforme")

const express = require("express");
const Router = express.Router()

Router.get("/getInformes/:UsuarioId", controller)

module.exports = Router