const { Router } = require("express");
const { controller } = require("../../controllers/GET/androidGetuser")

const router = Router()

module.exports = router.get("/getUsers/:email/:pass", controller)

