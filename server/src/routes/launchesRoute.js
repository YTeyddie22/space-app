const express = require("express");
const {
	httpGetAllLaunches,
	httpCreateNewLaunch,
	httpAbortLaunch,
} = require("../controllers/launchesController");

const launchesRouter = express.Router();

launchesRouter.route("/").get(httpGetAllLaunches);
launchesRouter.route("/").post(httpCreateNewLaunch);
launchesRouter.route("/:id").delete(httpAbortLaunch);

module.exports = launchesRouter;
