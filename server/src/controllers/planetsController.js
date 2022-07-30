const {getAllPlanets} = require('../models/Planets');

const httpGetAllPlanets = (req, res) => {
	return res.status(200).json(getAllPlanets());
};

module.exports = {
	httpGetAllPlanets,
};
