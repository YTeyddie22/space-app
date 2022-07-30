const express = require('express');
const {httpGetAllLaunches} = require('../controllers/launchesController');
const launchesRouter = express.Router();

launchesRouter.route('/launches').get(httpGetAllLaunches);

module.exports = launchesRouter;
