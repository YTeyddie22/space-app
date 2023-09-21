const express = require("express");
const {
	httpGetAllLaunches,
	httpCreateNewLaunch,
} = require("../controllers/launchesController");
const launchesRouter = express.Router();

launchesRouter.route("/").get(httpGetAllLaunches);
launchesRouter.route("/").post(httpCreateNewLaunch);

module.exports = launchesRouter;
