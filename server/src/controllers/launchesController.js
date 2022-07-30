const {getAllLaunches, createNewLaunch} = require('./../models/Launches');

//* Get all the launches
function httpGetAllLaunches(req, res) {
	return res.status(200).json(getAllLaunches());
}

//* Create a new launch object;

function httpCreateNewLaunch(req, res) {
	const launch = req.body;

	launch.launchDate = new Date(launch.launchDate);

	createNewLaunch(launch);

	return res.status(201).json(launch);
}

module.exports = {
	httpGetAllLaunches,
	httpCreateNewLaunch,
};
