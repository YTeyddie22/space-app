const express = require('express');
const {getAllLaunches} = require('../controllers/launchesController');
const launchesRouter = express.Router();

launchesRouter.route('/launches').get(getAllLaunches);

module.exports = launchesRouter;
