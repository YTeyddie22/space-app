const express = require('express');
const {httpGetAllLaunches} = require('../controllers/planetsController');
const planetRouter = express.Router();

planetRouter.route('/planets').get(httpGetAllLaunches);

module.exports = planetRouter;
