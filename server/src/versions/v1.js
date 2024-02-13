//version 1
const express = require("express");

const planetsRouter = require("../routes/planetRoute");
const launchesRouter = require("../routes/launchesRoute");

const api = express.Router();

//?* Getting the routes directly.
api.use("/planets", planetsRouter);
api.use("/launches", launchesRouter);

module.exports = api;
