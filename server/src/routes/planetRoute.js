const express = require('express');
const {getAllPlanets} = require('../controllers/planetsController');
const planetRouter = express.Router();

planetRouter.route('/planets').get(getAllPlanets);

module.exports = planetRouter;
