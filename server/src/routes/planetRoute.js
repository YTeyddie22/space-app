const express = require("express");
const { httpGetAllPlanets } = require("../controllers/planetsController");
const planetRouter = express.Router();

planetRouter.route("/").get(httpGetAllPlanets);

module.exports = planetRouter;
